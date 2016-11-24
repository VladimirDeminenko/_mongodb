/**
 * Created by Vladimir Deminenko on 24.11.2016.
 */

/*
 Velenir
 https://university.mongodb.com/courses/MongoDB/M101JS/2016_October/discussion/forum/threads/583553581ee0d246a81f554c
 My solutions:
 */

/*---------------------
 HW6.1:

 Instead of a more general solution like the official one, I searched for one specific person.
 */

db.companies.aggregate([
    {$match: {"relationships.person.permalink": "eric-di-benedetto"}},
    {
        $group: {
            _id: null,
            companies: {$addToSet: "$name"},
            count: {$sum: 1}
        }
    },
    {
        $project: {
            _id: 0,
            count: 1,
            unique: {
                $size: "$companies"
            }
        }
    }
])


/*---------------------
 HW6.2:

 Especially proud of this one. Brevity at the cost of readability.
 */

db.grades.aggregate([
    {
        $group: {
            _id: {"class": "$class_id"},
            avg_score: {
                $avg: {
                    $avg: {
                        $map: {
                            input: {
                                $filter: {input: "$scores", as: "item", cond: {$ne: ["$$item.type", "quiz"]}}
                            },
                            as: "not_quiz",
                            in: "$$not_quiz.score"
                        }
                    }
                }
            }
        }
    },
    {$sort: {avg_score: -1}}
])

db.grades.aggregate([
    {$unwind: "$scores"},
    {$match: {"scores.type": {$ne: "quiz"}}},
    {$group: {_id: {student_id: "$student_id", class_id: "$class_id"}, avg: {$avg: "$scores.score"}}},
    {$group: {_id: "$_id.class_id", avg: {$avg: "$avg"}}},
    {$sort: {"avg": -1}},
    {$limit: 5}])


/*---------------------
 HW6.3:

 This one makes use of a trick for matching array size.
 */

db.companies.aggregate([
    {$match: {founded_year: 2004, "funding_rounds.4": {$exists: true}}},
    {$project: {_id: 0, name: 1, raised_avg: {$avg: "$funding_rounds.raised_amount"}}},
    {$sort: {raised_avg: 1}}
])
