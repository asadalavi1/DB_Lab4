# Import Modules
from __future__ import print_function   # make print a function
from pymongo import MongoClient
import sys                              # for passing shell arguments, misc errors
import cmd                              # for creating interactive commandline interface
import shlex                            # for parsing shell type arguments
import datetime
import time
import random
import pprint

# Person Type
EDITOR, AUTHOR, REVIEWER, RETIRED_REVIEWER = "1", "2", "3", "4"

# Configure SQL Driver
#PASS = "" if len(sys.argv) < 1 else sys.argv[1]    # user's password
SERVER = "mongodb://Team22:8NouhbjLuahLOcZK@cluster0-shard-00-00-ppp7l.mongodb.net:27017,cluster0-shard-00-01-ppp7l.mongodb.net:27017,cluster0-shard-00-02-ppp7l.mongodb.net:27017"                # db server to connect to
#USER = "Team22"                                    # user to connect as
DB = "Team22DB"                                   # db to user


class CmdInterface(cmd.Cmd):
    """Applications Commandline interface"""

    def init(self, db):
        self.db = db
        self.mode = "none"
        self.curr_id = -1

    def do_submit(self, line):
        # verify mode
        if self.mode != 'author':
            print("Command not usable in this mode")
            return

        # extract arguments
        args = shlex.split(line)
        title, affiliation, ri_code = args[:3]
        authors = [self.curr_id]
        authors.extend(args[3:-1])
        filename = args[-1]

        # Assign an editor to the submitted manuscript
        EDITOR_QUERY = "SELECT id FROM Person WHERE type = 1;"
        chosen_editor = -1
        if self.do_execute(EDITOR_QUERY):
            editor_ids = list()

            for row in self.cursor:
                editor_ids.append(row['id'])

            chosen_editor = random.choice(editor_ids)
        else:
            print("Unexpected Error in assigning editor to manuscript!")
            return

        assert chosen_editor >= 0

        # create squery to insert manuscript into manuscript table
        INSERT_QUERY = ("INSERT INTO `Manuscript` (`title`,`description`,`ri_code`,`status`,`issue_vol`,`issue_year`,"
                        "`num_pages`, `start_page`, `review_date`, `filename`, `assigned_editor`) VALUES "
                        "(\'{}\', '', {}, \'{}\', NULL, NULL, NULL, NULL, NULL, \'{}\', {});").format(title, ri_code, 'Submitted', filename, chosen_editor)

        new_manuscript_id = -1
        if not self.do_execute(INSERT_QUERY):
            print("Unable to execute SQL query. Reverting state")
            self.con.rollback()
            return
        else:
            new_manuscript_id = self.cursor.lastrowid

        # create query to update current logged in users affiliation
        queries = list()
        UPDATE_QUERY = (("UPDATE `Person` "
                         "SET affiliation = '{}' WHERE id = {};").format(affiliation, self.curr_id))

        self.do_execute(UPDATE_QUERY)

        # ensure authors exist in persons table, insert all listed authors into manuscript_author table with their rank
        rank = 1
        for author in authors:
            queries.append("SELECT * FROM Person WHERE id = {} AND type = {};".format(author, AUTHOR))
            queries.append(("INSERT INTO `Manuscript_Author` (`manuscript_id`, `author_id`, `rank`) "
                            "VALUES ('{}', '{}', '{}');").format(new_manuscript_id, author, rank))
            rank = rank + 1

        for query in queries:
            if not self.do_execute(query):
                print("Unable to execute SQL query. Reverting state")
                self.con.rollback()
                return

        self.con.commit()

    def do_assign(self, line):
        # verify mode
        if self.mode != "editor":
            print("Command not usable in this mode")
            return

        # extract arguments
        man_id, rev_id = shlex.split(line)

        # verify manuscript belongs to logged in editor
        permissions_check = ("SELECT * FROM Manuscript "
                             "WHERE id = {} AND assigned_editor = {};").format(man_id, self.curr_id)
        if not self.do_execute(permissions_check):
            print("Invalid Input: Only manuscripts belonging to current editor can be assigned")
            return

        # verify assigning to reviewer
        rev_validation_query = "SELECT * FROM Person WHERE id = {} AND type = {};".format(rev_id, REVIEWER)
        if not self.do_execute(rev_validation_query):
            print("Invalid Input: Manuscript can only be assigned to reviewers")
            return

        # find interests of reviewer being assigned
        ri_code_validation_query = "SELECT ri_code FROM Reviewer_Interest WHERE reviewer_id = {};".format(rev_id)
        if not self.do_execute(ri_code_validation_query):
            return

        interest_ri_codes = list()
        for row in self.cursor:
            interest_ri_codes.append(row['ri_code'])

        # find ri_code of Manuscript
        man_ri_code_query = ("SELECT ri_code FROM Manuscript "
                             "WHERE id = {} AND assigned_editor = {};").format(man_id, self.curr_id)
        if not self.do_execute(man_ri_code_query):
            return

        man_ri_code = -1
        for row in self.cursor:
            man_ri_code = row['ri_code']

        assert man_ri_code > -1

        # ensure reviewer and manuscript interests align
        if man_ri_code not in interest_ri_codes:
            print("Invalid Assignment: This paper does not match Reviewer {}'s Interests!".format(rev_id))
            return

        # insert manuscript_reviewer and update manuscript status
        now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        queries = [("INSERT INTO `Manuscript_Reviewer` "
                    "(`reviewer_id`, `manuscript_id`, `result`, `clarity`, `method`, `contribution`, `appropriate`) "
                    "VALUES ({},{},'-',NULL,NULL,NULL,NULL);").format(rev_id, man_id)]
        queries += [("UPDATE Manuscript SET status = \'{}\', review_date = \'{}\'"
                     "WHERE id = {};").format("Under Review", now, man_id)]

        # execute queries
        for query in queries:
            if not self.do_execute(query):
                print("Unable to execute SQL query. Reverting state")
                self.con.rollback()
                return

        self.con.commit()

    def do_login(self, line):
        if self.mode != "none":
            print("Command not usable. Already logged in as {}".format(self.curr_id))
            return

        # parse arguments
        user_id = shlex.split(line)[0]
        user = self.db.person.find_one({"id": user_id})

        if user is None:
            print("Invalid Input: User ID Not Found")
            return

        self.curr_id = user["id"]
        if user["type"] == EDITOR:
            print("\n---------EDITOR PANEL---------\n")
            print("Hello {} {}!\nYour ID is: {} \n".format(user["first_name"], user["last_name"], user["id"]))
            self.mode = "editor"

            self.do_display(list(self.db.manuscript.aggregate(
               [
                 { "$match": {"assigned_editor": self.curr_id}},   
                 { "$group" : { "_id" : "$status", "count": { "$sum": 1 } } }
               ]
            )), ['_id', 'count']);

            print("")

        elif user["type"] == AUTHOR:
            print("\n---------AUTHOR PANEL---------\n")
            print("Hello {} {}!\nYour ID is: {}\nYour Address on file is:\n{} \n".format(user["first_name"], user["last_name"], user["id"], user["mailing_address"]))
            self.mode = "author"
        elif user["type"] == REVIEWER:
            print("\n---------REVIEWER PANEL---------\n")
            print("Hello {} {}!\nYour ID is: {} \n".format(user["first_name"], user["last_name"], user["id"]))
            self.mode = "reviewer"
        elif user["type"] == RETIRED_REVIEWER:
            print("\n---------RETIRED REVIEWER PANEL---------\n")
            print("Hello {} {}!\nYour ID is: {} \n".format(user["first_name"], user["last_name"], user["id"]))
            self.mode = "retired_reviewer"

            self.do_help("")            

    def do_register(self, line):
        # parse non-mode dependent arguments
        tokens = shlex.split(line)
        # map person type string to number
        pno = {'author': AUTHOR, 'editor': EDITOR, 'reviewer': REVIEWER}[tokens[0]]

        def insert_sqls(fname, lname, pno, email, address, ri_codes=[]):
            queries = ["INSERT INTO `Person` "
                       "(`first_name`, `last_name`, `type`, `email`, `affiliation`, `mailing_address`) VALUES "
                       "(\'{0}\', \'{1}\', {2}, \'{3}\', NULL, \'{4}\');".format(fname, lname, pno, email, address)]

            self.do_execute(queries.pop(0))

            for ri_code in ri_codes:
                queries.append("INSERT INTO `Reviewer_Interest`(`person_id`, `ri_code`) VALUES "
                               "({0}, {1});".format(self.cursor.lastrowid, ri_code))

            return queries

        # parse arguments if author
        ri_codes = []
        if pno == 2:
            ptype, fname, lname, email, address = tokens

        # parse arguments if editor
        elif pno == 1:
            ptype, fname, lname = tokens
            email, address = "", ""

        # parse arguments if reviewer
        elif pno == 3:
            ptype, fname, lname = tokens[:3]
            ri_codes = tokens[3:]
            if not (1 <= len(ri_codes) <= 3):
                print('Each reviewer must have at least 1 and no more than 3 ri_codes')
                return
            email, address = "", ""

        queries = insert_sqls(fname, lname, pno, email, address, ri_codes)

        # execute queries
        for query in queries:
            if not self.do_execute(query):
                self.con.rollback()
                return

        self.con.commit()

    def do_execute(self, query, multi=False):
        """helper function to execute SQL statement"""
        try:
            # execute input query
            queries = query if multi else [query]
            for q in queries:
                print("Executing Query: '{0}'".format(q))
                self.cursor.execute(q)
        except mysql.connector.Error as e:        # catch SQL errors
            print("SQL Error: {0}".format(e.msg))
            return False

        if self.cursor.rowcount > 0:
            print("Operation Successful!")
            return True
        else:
            print("No Rows Affected by Operation, such a record does not exist or is inaccessible")
            return False

    def do_display(self, result_set, keys_to_display):
        """helper function to execute SQL statement and render results"""
        # print table header
        print("\n\nResults:")
        print("".join(["{:<15} ".format(col) for col in keys_to_display]))
        print("--------------------------------------------")

        # iterate through results
        for row in result_set:
            print("".join(["{:<15} ".format(row[col]) for col in keys_to_display]))

    def do_logout(self, line):
        self.mode = "none"
        self.curr_id = -1

    def help_register(self):
        print('\n'.join(['Signup: register author <fname> <lname> <email> <address>',
                         'register editor <fname> <lname>',
                         'register reviewer <fname> <lname> <ri_code1> [ri_code2] [ri_code3]']))

    def help_login(self):
        print('\n'.join(['Login: login <user_id>']))

    def do_help(self, line):
        if len(shlex.split(line)) == 0:
            if self.mode == "none":
                print('\n'.join(['Available Commands:', '- register', '- login', '- exit\n']))
            elif self.mode == "editor":
                print('\n'.join(['Available Commands:', '- status' , '- status issue', '- createissue', '- assign', '- accept', '- reject', '- typeset', '- schedule', '- publish', '- logout' ,'- exit\n']))
            elif self.mode == "author":
                print('\n'.join(['Available Commands:', '- status', '- submit', '- retract', '- logout' ,'- exit\n']))
            elif self.mode == "reviewer":
                print('\n'.join(['Available Commands:', '- resign' ,'- status', '- accept', '- reject', '- logout' ,'- exit\n']))
            else:
                print('\n'.join(['Available Commands:', '- exit\n']))
        else:
            if shlex.split(line)[0] == "register":
                self.help_register()
            elif shlex.split(line)[0] == "login":
                self.help_login()

    def do_status(self, line):
        if self.mode == "author":
            result = list(self.db.manuscript_author.aggregate(
                [
                    { "$match": {"rank": "1", "author_id": self.curr_id}}, {"$lookup":  { "from": "manuscript", "localField": "manuscript_id", "foreignField": "id", "as": "paperInfo" } }, 
                    { "$project": {"paperInfo.title": 1, "paperInfo.id": 1, "paperInfo.status": 1, "_id": 0} } 
                ]
            ));

            if (len(result) == 0):
                print ("Nothing to show at this moment.")
                return

            to_print = ['id', 'title', 'status']

            print("\nStatus of Submitted Manuscripts:")
            print("".join(["{:<12} ".format(col) for col in to_print]))
            print("--------------------------------------------")


            for res in result:
                for paperInfo in res['paperInfo']:
                    print("".join(["{:<12} ".format(paperInfo[col]) for col in to_print]))

            # iterate through results

        elif self.mode == "editor":
            if len(shlex.split(line)) == 0:
                self.do_display(list(self.db.manuscript.aggregate(
                    [
                        { "$match": {"assigned_editor": self.curr_id}},    
                        { "$project": {"title": 1, "id": 1, "status": 1, "_id": 0} } 
                    ]
                )), ['id', 'title', 'status']);
            else:
                if shlex.split(line)[0] == 'issue':
                    self.do_display(list(self.db.issue.find()), ['year', 'period', 'title', 'status'])

            # print("\nStatus of Manuscripts in System:")
            # print("".join(["{:<12}".format(col) for col in self.cursor.column_names]))
            # print("--------------------------------------------")

            # # iterate through results
            # for row in self.cursor:
            #     print("{}\t{}".format((row["status"].replace("_", " ")).title(), row["num"]))

        elif self.mode == "reviewer":
            result = list(self.db.manuscript_reviewer.aggregate(
                [
                    { "$match": {"result": "-", "reviewer_id": self.curr_id}}, {"$lookup":  { "from": "manuscript", "localField": "manuscript_id", "foreignField": "id", "as": "paperInfo" } }, 
                    { "$project": {
                        "paperInfo.title": 1, 
                        "paperInfo.id": 1, 
                        "paperInfo.status": {"$filter": {
                            "input": "$paperInfo.status", 
                            "as": "status",
                            "cond": {"$eq": ["$$status", "Under Review"]}
                        }}, 
                        "_id": 0} } 
                ]
            ));

            #print(result)

            cols_to_print = ['id', 'title', 'status']

            print("\nStatus of Assigned Manuscripts:")
            print("".join(["{:<12} ".format(col) for col in cols_to_print]))
            print("--------------------------------------------")

            str_to_print = list()

            for res in result:
                for paperInfo in res['paperInfo']:
                    for col in cols_to_print:
                        if col == "status":
                            str_to_print.append("{:<12} ".format(str(paperInfo[col][0])))
                        else:
                            str_to_print.append("{:<12} ".format(str(paperInfo[col])))

            print ("".join(str_to_print))

            # print("\nStatus of Assigned Manuscripts:")
            # print("".join(["{:<12}".format(col) for col in self.cursor.column_names]))
            # print("--------------------------------------------")

            # # iterate through results
            # for row in self.cursor:
            #     print("{}\t{}".format(row["id"], ("{}...").format(row["title"][:20])))

        else:
            print("Command not usable in this mode")

    def do_accept(self, line):
        if self.mode == "reviewer":
            manuscript_id, appropriate, clarity, method, contribution = map(int, shlex.split(line))
            try:
                if not (0 <= appropriate <= 10) or not (0 <= clarity <= 10) or not (0 <= method <= 10) or not (0 <= contribution <= 10):
                    print("Invalid Input: Scores must be between 0 and 10")
                    return
            except ValueError:
                print("Invalid Input: Please assign valid scores")
                return

            result = self.db.manuscript_reviewer.update_one(
                {"reviewer_id": str(self.curr_id), "manuscript_id": str(manuscript_id), "result": "-"}, 
                {"$set": {"result": "y", "clarity": clarity, "method": method, "contribution": contribution, "appropriate": appropriate}}
            )

            if result.modified_count < 1:
                print ("Update Failed!")

        elif self.mode == "editor":
            manuscript_id = line
            # verify manuscript belongs to logged in editor
            result = list(self.db.manuscript.find({"id": str(manuscript_id), "assigned_editor": str(self.curr_id)}))

            if len(result) == 0:
                print("Invalid Input: Only manuscripts belonging to current editor can be accepted")
                return

            # verify if all reviewers submitted their results
            result = list(self.db.manuscript_reviewer.find({"manuscript_id": str(manuscript_id), "result": "-"}))

            if len(result) > 0:
                print("Can't accept manuscript until all manuscript reviewers submit their results")
                return

            # update manuscript status

            result = self.db.manuscript.update_one(
                    {"id": manuscript_id}, 
                    {"$set": {"status": "Accepted"}}
                )

            if (result.modified_count < 1):
                print("Unable to Update, DB Error!")

        else:
            print("Command not usable in this mode")

    def do_reject(self, line):
        if self.mode == "reviewer":
            manuscript_id, appropriate, clarity, method, contribution = map(int, shlex.split(line))
            try:
                if (appropriate < 0 or appropriate > 10) or (clarity < 0 or clarity > 10) or (method < 0 or method > 10) or (contribution < 0 or contribution > 10):
                    print("Scores must be between 0 and 10")
                    return

            except ValueError:
                print("Invalid Input, please retry")
                return

            result = self.db.manuscript_reviewer.update_one(
                {"reviewer_id": str(self.curr_id), "manuscript_id": str(manuscript_id), "result": "-"}, 
                {"$set": {"result": "n", "clarity": clarity, "method": method, "contribution": contribution, "appropriate": appropriate}}
            )

            if result.modified_count < 1:
                print ("Update Failed!")

        elif self.mode == "editor":
            manuscript_id = line
            # verify manuscript belongs to logged in editor
            result = list(self.db.manuscript.find({"id": str(manuscript_id), "assigned_editor": str(self.curr_id)}))

            if len(result) == 0:
                print("Invalid Input: Only manuscripts belonging to current editor can be rejected")
                return

            # verify if all reviewers submitted their results
            result = list(self.db.manuscript_reviewer.find({"manuscript_id": str(manuscript_id), "result": "-"}))

            if len(result) > 0:
                print("Can't reject manuscript until all manuscript reviewers submit their results")
                return

            # update manuscript status

            result = self.db.manuscript.update_one(
                    {"id": manuscript_id}, 
                    {"$set": {"status": "Rejected"}}
                )

            if (result.modified_count < 1):
                print("Unable to Update, DB Error!")
        else:
            print("Command not usable in this mode")

    def do_typeset(self, line):
        # verify mode
        if self.mode != "editor":
            print ("Command not usable in this mode")

        # parse arguments
        manuscript_id, pp = map(int, shlex.split(line))

        # verify manuscript belongs to logged in editor
        permissions_check = ("SELECT * FROM Manuscript "
                             "WHERE id = {} AND assigned_editor = {};").format(manuscript_id, self.curr_id)

        if not self.do_execute(permissions_check):
            print("Invalid Input: Only manuscripts belonging to current editor can be typeset")
            return

        # execute query
        query = ("UPDATE Manuscript SET status = \'{}\', num_pages = {} "
                 "WHERE id = {} and status = \'Accepted\' AND assigned_editor = {};").format("Typesetting", pp, manuscript_id, self.curr_id)

        if self.do_execute(query):
            self.con.commit()

    def do_schedule(self, line):
        if self.mode != "editor":
            print ("Command not usable in this mode")

        manuscript_id, issue_vol, issue_year = shlex.split(line)

        # verify manuscript belongs to logged in editor
        permissions_check = ("SELECT * FROM Manuscript "
                             "WHERE id = {} AND assigned_editor = {};").format(manuscript_id, self.curr_id)

        if not self.do_execute(permissions_check):
            print("Invalid Input: Only manuscripts belonging to current editor can be scheduled")
            return

        # find number of pages in manuscript
        NUM_PAGES_QUERY = ("SELECT num_pages FROM Manuscript "
                           "WHERE id = {} AND assigned_editor = {} AND status = \'Typesetting\';").format(manuscript_id, self.curr_id)

        if not self.do_execute(NUM_PAGES_QUERY):
            return

        num_pages = -1
        for row in self.cursor:
            num_pages = row['num_pages']

        assert num_pages > 0

        # find current total page count of issue (without manuscript being scheduled)
        SUM_PAGES_QUERY = ("SELECT SUM(num_pages) as sum_pages "
                           "FROM Manuscript "
                           "WHERE status = 'Scheduled' AND issue_vol = {} AND issue_year = {};").format(issue_vol, issue_year)

        sum_pages = 0
        if self.do_execute(SUM_PAGES_QUERY):
            for row in self.cursor:
                if row['sum_pages'] is not None:
                    sum_pages = row['sum_pages']

        # ensure issue page count within bounds accounting for page count of manuscript being scheduled
        if sum_pages + num_pages > 100:
            print("Cannot Schedule: Issue has exceeded a 100 pages")
            return

        UPDATE_QUERY = ("UPDATE Manuscript "
                        "SET issue_vol = {}, issue_year = {}, start_page = {}, status = \'Scheduled\' "
                        "WHERE id = {};").format(issue_vol, issue_year, sum_pages + 1, manuscript_id)

        if self.do_execute(UPDATE_QUERY):
            self.con.commit()

    def do_publish(self, line):
        # verify mode
        if self.mode != "editor":
            print ("Command not usable in this mode")

        issue_vol, issue_year = shlex.split(line)

        result = db.issue.update_one({"year": issue_year, "volume": issue_vol, "status": "Scheduled"}, {"$set": {"status": "Published"}})

        if result.modified_count == 1:
            db.manuscript.update_many({"issue_year": issue_year, "issue_vol": issue_vol, "status": "Scheduled"}, {"$set": {"status": "Published"}})

    def do_createissue(self, line):
        if self.mode != "editor":
            print ("Command not usable in this mode")

        issue_vol, issue_year, issue_period, issue_title = shlex.split(line)
        issue_period = int(issue_period)

        if issue_period > 4 or issue_period < 0:
            print("Invalid Input: Issue period must be between 0 and 4")
            return

        CREATE_QUERY = ("INSERT INTO `aalavi_db`.`Issue` (`year`, `period`, `volume`, `title`) "
                        "VALUES ('{}', '{}', '{}', '{}');").format(issue_year, issue_period, issue_vol, issue_title)

        if self.do_execute(CREATE_QUERY):
            self.con.commit()

    def do_retract(self, line):
        if self.mode != "author":
            print("Command not usable in this mode")

        manuscript_id = shlex.split(line)[0]
        try:
            manuscript_id = int(manuscript_id)
            if manuscript_id < 0:
                print("Invalid Input: ID must be non-negative!")
                return
        except ValueError:
            print("Invalid Input: Please enter valid manuscript id")
            return

        # only the primary author of the manuscript can retract it
        CHECK_QUERY = ("SELECT * FROM Manuscript_Author WHERE "
                       "author_id = {} AND manuscript_id = {} AND rank = 1;").format(self.curr_id, manuscript_id)

        if not self.do_execute(CHECK_QUERY):
            return

        query_list = list()
        query_list.append("DELETE FROM Manuscript_Author WHERE manuscript_id = {};".format(manuscript_id))
        query_list.append("DELETE FROM Manuscript_Reviewer WHERE manuscript_id = {};".format(manuscript_id))
        query_list.append("DELETE FROM Manuscript WHERE id = {};".format(manuscript_id))

        for query in query_list:
            self.do_execute(query)
        self.con.commit()

        print("Manuscript successfully retracted!")

    def do_resign(self, line):
        if self.mode != "reviewer":
            print("Command not usable in this mode")
            return

        answer = raw_input("Do you really want to resign? (y or n): ")
        if answer == "y":
            result = self.db.person.update_one({"id": str(self.curr_id)}, {"$set": {"type": "4"}});

            if result.modified_count == 0:
                print ("DB Error: Update Failed!")
                return

    def do_EOF(self, line):
        return True

    def do_exit(self, line):
        sys.exit(0)

    def do_quit(self, line):
        self.do_exit(line)


if __name__ == "__main__":
    # setup connection to db
    con = MongoClient(SERVER, connect = False, ssl = True)
    con.server_info()
    print("Connection to MegaMongododo Publications DB established.")

    # enter commandline i/o loop
    prompt = CmdInterface()
    prompt.prompt = '> '
    prompt.init(con[DB])
    prompt.cmdloop('Starting MegaMongododo Publication Prompt')

    print("\nConnection terminated.", end='')