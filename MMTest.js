// Equivalent SQL Query (Author Status)
// "SELECT Manuscript.id, Manuscript.title, Manuscript.status "
//                             "FROM Manuscript, Person, Manuscript_Author "
//                             "WHERE Manuscript.id = Manuscript_Author.manuscript_id "
//                             "AND Person.id = {} "
//                             "AND Person.id = Manuscript_Author.author_id "
//                             "AND Manuscript_Author.rank = 1;"

db.manuscript_author.aggregate(
	[
		{ $match: {"rank": "1"}}, {$lookup:  { from: "manuscript", localField: "manuscript_id", foreignField: "id", as: "paperInfo" } }, 
		{ $project: {"paperInfo.title": 1, "paperInfo.id": 1, "paperInfo.status": 1, "_id": 0} } 
	]
).pretty();

// Equivalent SQL Query (Editor Status)
// "SELECT status, count(*) as num "
//                                 "FROM Manuscript "
//                                 "WHERE assigned_editor = {} "
//                                 "GROUP BY status "
//                                 "ORDER BY status, num;"

db.manuscript.aggregate(
   [
   	 { $match: {"assigned_editor": "1"}},	
     { $group : { _id : "$status", count: { $sum: 1 } } }
   ]
).pretty();

//Equivalent SQL Query (Reviewer Status)
// "SELECT Manuscript.id, Manuscript.title FROM Manuscript, Person, Manuscript_Reviewer "
//                             "WHERE Manuscript.id = Manuscript_Reviewer.manuscript_id "
//                             "AND Person.id = {} "
//                             "AND Person.id = Manuscript_Reviewer.reviewer_id "
//                             "AND Manuscript.status = 'Under Review' "
//                             "AND Manuscript_Reviewer.result = '-';"

db.manuscript_reviewer.aggregate(
	[
		{ $match: {"result": "-"}}, {$lookup:  { from: "manuscript", localField: "manuscript_id", foreignField: "id", as: "paperInfo" } }, 
		{ $project: {
			"paperInfo.title": 1, 
			"paperInfo.id": 1, 
			"paperInfo.status": {$filter: {
				input: "$paperInfo.status", 
				as: "status",
				cond: {$eq: ["$$status", "Under Review"]}
			}}, 
			"_id": 0} } 
	]
).pretty();

//Equivalent SQL Query (Publish Issue)
// "UPDATE Issue SET status = \'Published\' "
//                         "WHERE year = {} and volume = {} AND status = \'Scheduled\';"

db.issue.update({"year": "2017", "volume": "1", "status": "Scheduled"}, {$set: {"status": "Published"}})

//Equivalent SQL Query (Publish Manuscripts)
// "UPDATE Manuscript SET status = \'Published\' "
//                                   "WHERE issue_year = {} and issue_vol = {} AND status = \'Scheduled\';"

db.manuscript.update({"issue_year": "2017", "issue_vol": "1", "status": "Scheduled"}, {$set: {"status": "Published"}}, {multi: true})