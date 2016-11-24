/**
 * Created by Vladimir Deminenko on 23.11.2016.
 */

// For companies in our collection founded in 2004 and having 5 or more rounds of funding,
// calculate the average amount raised in each round of funding.
// Which company meeting these criteria raised the smallest average amount of money per funding round?
// You do not need to distinguish between currencies. Write an aggregation query to answer this question.
//
// As a check on your solution, Facebook had the largest funding round average.

// Choose the best answer:

/*
 Limerick BioPharma
 Nimbit
 KAYAK
 Sugar CRM
 Pentaho
 Yelp
 ooma
 Tumri
 Hakia
 Balihoo
 */


// step 1, start
db.companies.aggregate([
    {
        $match: {
            founded_year: 2004
        }
    },
    {
        $project: {
            _id: 0,
            name: 1,
            permalink: 1,
            funding_rounds: 1
        }
    }
]).pretty();


// step 2
db.companies.aggregate([
    {
        $match: {
            founded_year: 2004
        }
    },
    {
        $project: {
            _id: 0,
            name: 1,
            permalink: 1,
            funding_rounds: 1
        }
    },
    {
        $unwind: "$funding_rounds"
    }
]).pretty();


// step 3
db.companies.aggregate([
    {
        $match: {
            founded_year: 2004
        }
    },
    {
        $project: {
            _id: 0,
            name: 1,
            permalink: 1,
            funding_rounds: 1
        }
    },
    {
        $unwind: "$funding_rounds"
    },
    {
        $project: {
            _id: 0,
            name: 1,
            permalink: 1,
            raised_amount: "$funding_rounds.raised_amount"
        }
    }
]).pretty();


// step 4
db.companies.aggregate([
    {
        $match: {
            founded_year: 2004
        }
    },
    {
        $project: {
            _id: 0,
            name: 1,
            permalink: 1,
            funding_rounds: 1
        }
    },
    {
        $unwind: "$funding_rounds"
    },
    {
        $project: {
            _id: 0,
            name: 1,
            permalink: 1,
            raised_amount: "$funding_rounds.raised_amount"
        }
    },
    {
        $group: {
            _id: {
                permalink: "$permalink",
                name: "$name"
            },
            count: {$sum: 1},
            raised_amount_average: {$avg: "$raised_amount"}
        }
    }
]).pretty();


// step 5
db.companies.aggregate([
    {
        $match: {
            founded_year: 2004
        }
    },
    {
        $project: {
            _id: 0,
            name: 1,
            permalink: 1,
            funding_rounds: 1
        }
    },
    {
        $unwind: "$funding_rounds"
    },
    {
        $project: {
            _id: 0,
            name: 1,
            permalink: 1,
            raised_amount: "$funding_rounds.raised_amount"
        }
    },
    {
        $group: {
            _id: {
                permalink: "$permalink",
                name: "$name"
            },
            count: {$sum: 1},
            raised_amount_average: {$avg: "$raised_amount"}
        }
    },
    {
        $match: {
            count: {$gte: 5}
        }
    }
]).pretty();


// step 6
db.companies.aggregate([
    {
        $match: {
            founded_year: 2004
        }
    },
    {
        $project: {
            _id: 0,
            name: 1,
            permalink: 1,
            funding_rounds: 1
        }
    },
    {
        $unwind: "$funding_rounds"
    },
    {
        $project: {
            _id: 0,
            name: 1,
            permalink: 1,
            raised_amount_average: {$avg: "$funding_rounds.raised_amount"},
            count: {$sum: 1}
        }
    }
]).pretty();


db.companies.aggregate([
    {
        $match: {
            founded_year: 2004,
            "funding_rounds.4": {
                $exists: true
            }
        }
    },
    {
        $project: {
            _id: 0,
            name: 1,
            raised_amount_average: {
                $avg: "$funding_rounds.raised_amount"
            }
        }
    },
    {
        $sort: {
            "raised_amount_average": 1
        }
    },
    {
        $limit: 1
    }
]).pretty();
// result:
/*
 { "name" : "Nimbit", "raised_amount_average" : 1085127.2 }
 */
