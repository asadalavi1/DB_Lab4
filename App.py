# Import Modules
from __future__ import print_function   # make print a function
from pymongo import MongoClient
import sys                              # for passing shell arguments, misc errors
import cmd                              # for creating interactive commandline interface
import shlex                            # for parsing shell type arguments
import datetime
import random

# Person Type
EDITOR, AUTHOR, REVIEWER, RETIRED_REVIEWER = 1, 2, 3, 4

# Configure SQL Driver
SERVER = "mongodb://Team22:8NouhbjLuahLOcZK@cluster0-shard-00-00-ppp7l.mongodb.net:27017,cluster0-shard-00-01-ppp7l.mongodb.net:27017,cluster0-shard-00-02-ppp7l.mongodb.net:27017"
DB = "Team22DB"


class CmdInterface(cmd.Cmd):
    """Applications Commandline interface"""

    def init(self, db):
        self.db = db
        self.mode = "none"
        self.curr_id = -1

    def get_next_sequence(self, name):
        return self.db.counters.find_and_modify(query={'_id': name},
                                                update={'$inc': {'seq': 1}}, new=True).get('seq')

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

        authors = map(int, authors)

        filename = args[-1]

        # Assign an editor to the submitted manuscript
        editors = list(self.db.person.find({"type": 1}))

        chosen_editor = -1
        if len(editors) > 0:
            editor_ids = list()

            for row in editors:
                editor_ids.append(row['_id'])

            chosen_editor = random.choice(editor_ids)
        else:
            print("Unexpected Error in assigning editor to manuscript!")
            return

        assert chosen_editor >= 0

        # ensure authors exist in table
        for author in authors:
            result = list(self.db.person.find({"_id": author, "type": AUTHOR}))

            if (len(result) == 0):
                print ("There is no author with id {}".format(author))
                return

        # create squery to insert manuscript into manuscript table
        now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        new_manuscript = self.db.manuscript.insert_one({
                "_id": self.get_next_sequence("manuscript"),
                "title": title,
                "description": "",
                "ri_code": int(ri_code),
                "status": "Submitted",
                "filename": filename,
                "chosen_editor": chosen_editor,
                "date_created": now,
                "date_changed": now,
                "start_page": None,
                "review_date": None,
                "num_pages": None,
                "issue_year": None,
                "issue_vol": None
            })

        if not new_manuscript.acknowledged:
            print("Unable to Insert")
            return
        else:
            new_manuscript_id = new_manuscript.inserted_id

        # create query to update current logged in users affiliation
        objects = list()

        self.db.person.update_one({"_id": self.curr_id}, {"$set": {"affiliation": affiliation}})

        # insert all listed authors into manuscript_author table with their rank
        rank = 1

        for author in authors:
            objects.append({
                    "manuscript_id": new_manuscript_id,
                    "author_id": author,
                    "rank": rank
                })

            rank = rank + 1

        result = self.db.manuscript_author.insert_many(objects)

        if not result.acknowledged:
            for author in authors:
                self.db.manuscript_author.delete_one({"manuscript_id": new_manuscript_id, "author_id": author})

            self.db.manuscript.delete_one({"_id": new_manuscript_id})

    def do_assign(self, line):
        # verify mode
        if self.mode != "editor":
            print("Command not usable in this mode")
            return

        # extract arguments
        man_id, rev_id = map(int, shlex.split(line))

        # verify manuscript belongs to logged in editor
        permissions_check = self.db.manuscript.find({"_id": man_id, "assigned_editor": self.curr_id})
        if not permissions_check:
            print("Invalid Input: Only manuscripts belonging to current editor can be assigned")
            return

        # verify assigning to reviewer
        rev_validation_query = self.db.person.find({"_id": rev_id, "type": REVIEWER})
        if not rev_validation_query:
            print("Invalid Input: Manuscript can only be assigned to reviewers")
            return

        # find interests of reviewer being assigned
        # ri_code_validation_query = "SELECT ri_code FROM Reviewer_Interest WHERE reviewer_id = {};".format(rev_id)
        ri_code_validation_query = list(self.db.reviewer_interest.find({"reviewer_id": rev_id}))
        if not ri_code_validation_query:
            print("Invalid Input: no reviewer interests found")
            return

        interest_ri_codes = map(lambda item: item['ri_code'], ri_code_validation_query)
        for row in ri_code_validation_query:
            interest_ri_codes.append(row['ri_code'])

        # find ri_code of Manuscript
        man_ri_code_query = self.db.manuscript.find({"_id": man_id, "assigned_editor": int(self.curr_id)})
        if not man_ri_code_query:
            print("No manuscript ri_code found")
            return

        man_ri_code = -1
        for row in list(man_ri_code_query):
            man_ri_code = row['ri_code']

        assert man_ri_code > -1

        # ensure reviewer and manuscript interests align
        if man_ri_code not in interest_ri_codes:
            print("Invalid Assignment: This paper does not match Reviewer {}'s Interests!".format(int(rev_id)))
            return

        # insert manuscript_reviewer and update manuscript status
        now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.db.manuscript_reviewer.insert({"reviewer_id": rev_id, "manuscript_id": man_id,
                                            "result": None, "clarity": None, "method": None,
                                            "contribution": None, "appropriate": None})

        update = self.db.manuscript.update_one({"_id": man_id},
                                               {"$set": {"status": "Under Review", "review_date": now}})
        if not update:
            print("Unable to update manuscript state")

    def do_login(self, line):
        if self.mode != "none":
            print("Command not usable. Already logged in as {}".format(int(self.curr_id)))
            return

        # parse arguments
        user_id = shlex.split(line)[0]
        user = self.db.person.find_one({"_id": int(user_id)})

        if user is None:
            print("Invalid Input: User ID Not Found")
            return

        self.curr_id = user["_id"]
        if user["type"] == EDITOR:
            print("\n---------EDITOR PANEL---------\n")
            print("Hello {} {}!\nYour ID is: {} \n".format(user["first_name"], user["last_name"], user["_id"]))
            self.mode = "editor"

            self.do_display(list(self.db.manuscript.aggregate(
               [
                   {"$match": {"assigned_editor": self.curr_id}},
                   {"$group": {"_id": "$status", "count": {"$sum": 1}}}
               ]
            )), ['_id', 'count'])

            print("")

        elif user["type"] == AUTHOR:
            print("\n---------AUTHOR PANEL---------\n")
            print("Hello {} {}!\nYour ID is: {}\nYour Address on file is:\n{} \n".format(user["first_name"], user["last_name"], user["_id"], user["mailing_address"]))
            self.mode = "author"
        elif user["type"] == REVIEWER:
            print("\n---------REVIEWER PANEL---------\n")
            print("Hello {} {}!\nYour ID is: {} \n".format(user["first_name"], user["last_name"], user["_id"]))
            self.mode = "reviewer"
        elif user["type"] == RETIRED_REVIEWER:
            print("\n---------RETIRED REVIEWER PANEL---------\n")
            print("Hello {} {}!\nYour ID is: {} \n".format(user["first_name"], user["last_name"], user["_id"]))
            self.mode = "retired_reviewer"

            self.do_help("")            

    def do_register(self, line):
        # parse non-mode dependent arguments
        tokens = shlex.split(line)
        # map person type string to number
        pno = {'author': AUTHOR, 'editor': EDITOR, 'reviewer': REVIEWER}[tokens[0]]

        def insert_person(fname, lname, pno, email, address, ri_codes=[]):
            for ri_code in ri_codes:
                result = list(self.db.ri_code.find({'_id': ri_code}))

                if (len(result) == 0):
                    print ("Invalid RI Code ({}) passed".format(ri_code))
                    return

            person_obj = {
                "_id": self.get_next_sequence('person'),
                "first_name": fname,
                "last_name": lname,
                "type": pno,
                "email": email,
                "affiliation": None,
                "mailing_address": address
            }

            new_id = self.db.person.insert_one(person_obj);

            if new_id.acknowledged:
                new_id = new_id.inserted_id

            for ri_code in ri_codes:
                self.db.reviewer_interest.insert_one({"reviewer_id": new_id, "ri_code": ri_code})

            return new_id

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

        ri_codes = map(int, ri_codes)
        ri_codes = list(set(ri_codes))

        new_id = insert_person(fname, lname, pno, email, address, ri_codes)

        if new_id != None:
            print ("New User Registered with ID: {}".format(new_id))

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
                    {"$match": {"rank": 1, "author_id": self.curr_id}}, {"$lookup":  { "from": "manuscript", "localField": "manuscript_id", "foreignField": "_id", "as": "paperInfo"}},
                    {"$project": {"paperInfo.title": 1, "paperInfo._id": 1, "paperInfo.status": 1, "_id": 0}}
                ]
            ))

            if (len(result) == 0):
                print ("Nothing to show at this moment.")
                return

            to_print = ['_id', 'title', 'status']

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
                        {"$match": {"assigned_editor": self.curr_id}},
                        {"$project": {"title": 1, "status": 1, "_id": 1}}
                    ]
                )), ['_id', 'title', 'status'])
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
                    {"$match": {"result": "-", "reviewer_id": self.curr_id}}, {"$lookup":  { "from": "manuscript", "localField": "manuscript_id", "foreignField": "_id", "as": "paperInfo" } }, 
                    {"$project": {
                        "paperInfo.title": 1,
                        "paperInfo._id": 1,
                        "paperInfo.status": {"$filter": {
                            "input": "$paperInfo.status",
                            "as": "status",
                            "cond": {"$eq": ["$$status", "Under Review"]}
                        }},
                        "_id": 0}}
                ]
            ))

            cols_to_print = ['_id', 'title', 'status']

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
                {"reviewer_id": self.curr_id, "manuscript_id": manuscript_id, "result": "-"},
                {"$set": {"result": "y", "clarity": clarity, "method": method,
                          "contribution": contribution, "appropriate": appropriate}}
            )

            if result.modified_count < 1:
                print ("Update Failed!")

        elif self.mode == "editor":
            manuscript_id = int(line)
            # verify manuscript belongs to logged in editor
            result = list(self.db.manuscript.find({"_id": manuscript_id, "assigned_editor": self.curr_id}))

            if len(result) == 0:
                print("Invalid Input: Only manuscripts belonging to current editor can be accepted")
                return

            # verify if all reviewers submitted their results
            result = list(self.db.manuscript_reviewer.find({"manuscript_id": manuscript_id, "result": "-"}))

            if len(result) > 0:
                print("Can't accept manuscript until all manuscript reviewers submit their results")
                return

            # update manuscript status
            result = self.db.manuscript.update_one(
                {"_id": manuscript_id},
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
                {"reviewer_id": self.curr_id, "manuscript_id": manuscript_id, "result": "-"},
                {"$set": {"result": "n", "clarity": clarity, "method": method, "contribution": contribution, "appropriate": appropriate}}
            )

            if result.modified_count < 1:
                print ("Update Failed!")

        elif self.mode == "editor":
            manuscript_id = int(line)
            # verify manuscript belongs to logged in editor
            result = list(self.db.manuscript.find({"_id": manuscript_id, "assigned_editor": self.curr_id}))

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
                {"_id": manuscript_id},
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

        # verify manuscript pages within limit
        pp_limit = 100
        if pp > pp_limit:
            print("Invalid Input: Manuscript pages have to be less than {} pages".format(pp_limit))

        # verify manuscript belongs to logged in editor
        permissions_check = self.db.manuscript.find({"_id": manuscript_id,
                                                     "assigned_editor": self.curr_id})
        if not permissions_check:
            print("Invalid Input: Only manuscripts belonging to current editor can be typeset")
            return

        # verify all reviewers have reviewed the paper before allowing typeset
        # execute query
        result = self.db.manuscript.update_one({"_id": manuscript_id, "status": "Accepted",
                                                "assigned_editor": self.curr_id},
                                               {"$set": {"status": "Typesetting", "num_pages": int(pp)}})
        if result.modified_count == 0:
            print ("DB Error: Update Failed!")
            return

    def do_schedule(self, line):
        if self.mode != "editor":
            print ("Command not usable in this mode")

        manuscript_id, issue_vol, issue_year = shlex.split(line)

        # verify manuscript belongs to logged in editor and has correct status
        permissions_check = self.db.manuscript.find({"_id": manuscript_id,
                                                     "assigned_editor": self.curr_id,
                                                     "status": "Typesetting"})
        if not permissions_check:
            print("Invalid Input: Only manuscripts with Typesetting status belonging to current editor can be scheduled")

        num_pages = permissions_check['num_pages']
        assert num_pages > 0

        # find current total page count of issue (without manuscript being scheduled)
        all_issue_manuscripts = self.db.manuscript.find({"status": "Scheduled", "issue_vol": issue_vol,
                                                         "issue_year": issue_year})

        sum_pages = sum([manuscript['num_pages'] for manuscript in all_issue_manuscripts
                         if 'num_pages' in manuscript])

        # ensure issue page count within bounds accounting for page count of manuscript being scheduled
        if sum_pages + num_pages > 100:
            print("Cannot Schedule: Issue has exceeded a 100 pages")
            return

        # update manuscript with its associated issue information
        result = self.db.manuscript.update_one({"_id": manuscript_id},
                                               {"issue_vol": issue_vol, "issue_year": issue_year,
                                                "start_page": sum_pages + 1})
        if result.modified_count == 0:
            print ("DB Error: Update Failed!")
            return

    def do_publish(self, line):
        # verify mode
        if self.mode != "editor":
            print ("Command not usable in this mode")

        issue_vol, issue_year = map(int, shlex.split(line))

        result = self.db.issue.update_one({"year": issue_year, "volume": issue_vol, "status": "Scheduled"},
                                          {"$set": {"status": "Published"}})

        if result.modified_count == 1:
            self.db.manuscript.update_many({"issue_year": issue_year, "issue_vol": issue_vol, "status": "Scheduled"},
                                           {"$set": {"status": "Published"}})

    def do_createissue(self, line):
        if self.mode != "editor":
            print ("Command not usable in this mode")

        issue_vol, issue_year, issue_period, issue_title = shlex.split(line)
        issue_period = int(issue_period)

        if issue_period > 4 or issue_period < 0:
            print("Invalid Input: Issue period must be between 0 and 4")
            return

        self.db.issue.insert_one({"year": issue_year, "period": issue_period,
                                  "volume": issue_vol, "title": issue_title})

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
        primary_author = self.db.manuscript_author.find({"author_id": self.curr_id,
                                                         "manuscript_id": manuscript_id, "rank": 1})
        if not primary_author:
            print("Invalid Input: Only primary author can retract manuscript")
            return

        self.db.manuscript_author.delete_many({"manuscript_id": manuscript_id})
        self.db.manuscript_reviewer.delete_many({"manuscript_id": manuscript_id})
        self.db.manuscript.delete_one({"_id": manuscript_id})

        print("Manuscript successfully retracted!")

    def do_resign(self, line):
        if self.mode != "reviewer":
            print("Command not usable in this mode")
            return

        answer = raw_input("Do you really want to resign? (y or n): ")
        if answer == "y":
            result = self.db.person.update_one({"_id": self.curr_id}, {"$set": {"type": RETIRED_REVIEWER}})

            if result.modified_count == 0:
                print ("DB Error: Update Failed!")
                return

        # find all manuscript-reviewer entries associated with current resigning reviewer
        manuscript_reviewer_entries = self.db.manuscript_reviewer.find({"reviewer_id": self.curr_id})
        for manuscript_reviewer_entry in manuscript_reviewer_entries:
            # find all manuscripts associated with current resigning reviewer that are under review
            manuscripts_of_reviewer = self.db.manuscript.find({"_id": manuscript_reviewer_entry['manuscript_id'],
                                                               "type": "Under_Review"})
            # find all reviewers associated with these manuscripts
            for manuscript in manuscripts_of_reviewer:
                reviewers_of_manuscript = self.db.manuscript_reviewer.find({"manuscript_id": manuscript})
                # if no reviewers of these manuscripts are left active
                if not any([self.db.person.find({"_id": reviewer['reviewer_id'], "type": REVIEWER})
                            for reviewer in reviewers_of_manuscript]):
                    # revert there status to submitted
                    self.db.manuscript.update_one({"_id": manuscript['_id']},
                                                  {"$set": {"type": "Submitted"}})
                    print("No active reviewers of manuscript {} left. \
                    Manuscript status reverted to Submitted".format(manuscript['id']))

    def do_EOF(self, line):
        return True

    def do_exit(self, line):
        sys.exit(0)

    def do_quit(self, line):
        self.do_exit(line)


if __name__ == "__main__":
    # setup connection to db
    con = MongoClient(SERVER, connect=False, ssl=True)
    con.server_info()
    print("Connection to MegaMongododo Publications DB established.")

    # enter commandline i/o loop
    prompt = CmdInterface()
    prompt.prompt = '> '
    prompt.init(con[DB])
    prompt.cmdloop('Starting MegaMongododo Publication Prompt')

    print("\nConnection terminated.", end='')
