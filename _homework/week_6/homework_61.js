/**
 * Created by Vladimir Deminenko on 22.11.2016.
 */


// Download Handouts:
//     companies_dataset.zip
// https://university.mongodb.com/static/MongoDB_2016_M101JS_October/handouts/companies_dataset.5113625bb62c.zip

// -------------------
// Homework: 6.1
// -------------------
// Starting with the example we looked at for calculating the total number of relationships
// individuals have participated in (in the CrunchBase data set):

db.companies.aggregate([
    {$match: {"relationships.person": {$ne: null}}},
    {$project: {relationships: 1, _id: 0}},
    {$unwind: "$relationships"},
    {
        $group: {
            _id: "$relationships.person",
            count: {$sum: 1}
        }
    },
    {$sort: {count: -1}}
]).pretty()

// Write an aggregation query that will determine the number of unique companies with which an individual has been
// associated. To test that you wrote your aggregation query correctly, from the choices below,
// select the number of unique companies that Eric Di Benedetto (eric-di-benedetto) has been associated with.
// I've attached the CrunchBase data set for use in this problem.
//
// Hint: Review the available accumulators before beginning this exercise.
// https://docs.mongodb.com/manual/meta/aggregation-quick-reference/?&_ga=1.197462703.1284853807.1476993137#accumulators

// As a check on your work, the number of unique companies for
// roger-ehrenberg is 16,
// for josh-stein is 14, and the number for
// tim-hanlon actually is 28.


db.companies.aggregate([
    {$match: {"relationships.person.permalink": "eric-di-benedetto"}},
    {$project: {name: 1, relationships: 1, _id: 0}},
    {$unwind: "$relationships"},
    {
        $group: {
            _id: "$relationships.person",
            count: {$sum: 1}
        }
    },
    {$sort: {count: -1}},
    {$match: {"_id.permalink": "eric-di-benedetto"}}
]).pretty()

db.companies.aggregate([
    {$match: {"relationships.person.permalink": "eric-di-benedetto"}},
    {$project: {name: 1, relationships: 1, _id: 0}},
    {$unwind: "$relationships"},
    {$sort: {name: 1}},
    {$match: {"relationships.person.permalink": "eric-di-benedetto"}}
]).pretty()

db.companies.aggregate([
    {$match: {"relationships.person.permalink": "eric-di-benedetto"}},
    {$project: {name: 1, relationships: 1, _id: 0}},
    {$unwind: "$relationships"},
    {$match: {"relationships.person.permalink": "eric-di-benedetto"}},
    {$sort: {name: 1}}
]).pretty()

db.companies.aggregate([
    {$match: {"relationships.person.permalink": "eric-di-benedetto"}},
    {$project: {name: 1, relationships: 1, _id: 0}},
    {$unwind: "$relationships"},
    {$match: {"relationships.person.permalink": "eric-di-benedetto"}},
    {
        $group: {
            _id: {name: "$name", person: "$relationships.person"},
        }
    },
    {$sort: {_id: 1}}
]).pretty()

db.companies.aggregate([
    {$match: {"relationships.person.permalink": "eric-di-benedetto"}},
    {$project: {name: 1, relationships: 1, _id: 0}},
    {$unwind: "$relationships"},
    {$match: {"relationships.person.permalink": "eric-di-benedetto"}},
    {
        $group: {
            _id: {name: "$name", person: "$relationships.person"},
            count: {$sum: 1}
        }
    }
]).pretty()

db.companies.aggregate([
    {$match: {"relationships.person.permalink": "eric-di-benedetto"}},
    {$project: {name: 1, relationships: 1, _id: 0}},
    {$unwind: "$relationships"},
    {$match: {"relationships.person.permalink": "eric-di-benedetto"}},
    {
        $group: {
            _id: {name: "$name", person: "$relationships.person"},
            set: {$addToSet: {name: "$name", person: "$relationships.person"}}
        }
    },
    {
        $project: {
            _id: 0,
            count: {$sum: {$size: "$set"}}
        }
    }
]).pretty()

// test 1 - roger-ehrenberg --> {result: 16}
db.companies.aggregate([
    {$match: {"relationships.person.permalink": "roger-ehrenberg"}},
    {$project: {name: 1, relationships: 1, _id: 0}},
    {$unwind: "$relationships"},
    {$match: {"relationships.person.permalink": "roger-ehrenberg"}},
    {
        $group: {
            _id: {name: "$name", person: "$relationships.person"},
            set: {$addToSet: {name: "$name", person: "$relationships.person"}}
        }
    },
    {
        $project: {
            _id: 0,
            count: {$sum: {$size: "$set"}}
        }
    },
    {
        $group: {
            _id: {count: "$count"},
            result: {"$sum": 1}
        }
    },
    {
        $project: {
            _id: 0,
            result: 1
        }
    }
]).pretty()


// test 2 - josh-stein --> {result: 14}
db.companies.aggregate([
    {$match: {"relationships.person.permalink": "josh-stein"}},
    {$project: {name: 1, relationships: 1, _id: 0}},
    {$unwind: "$relationships"},
    {$match: {"relationships.person.permalink": "josh-stein"}},
    {
        $group: {
            _id: {name: "$name", person: "$relationships.person"},
            set: {$addToSet: {name: "$name", person: "$relationships.person"}}
        }
    },
    {
        $project: {
            _id: 0,
            count: {$sum: {$size: "$set"}}
        }
    },
    {
        $group: {
            _id: {count: "$count"},
            result: {"$sum": 1}
        }
    },
    {
        $project: {
            _id: 0,
            result: 1
        }
    }
]).pretty()

// test 3 - tim-hanlon --> {result: 28}
db.companies.aggregate([
    {$match: {"relationships.person.permalink": "tim-hanlon"}},
    {$project: {name: 1, relationships: 1, _id: 0}},
    {$unwind: "$relationships"},
    {$match: {"relationships.person.permalink": "tim-hanlon"}},
    {
        $group: {
            _id: {name: "$name", person: "$relationships.person"},
            set: {$addToSet: {name: "$name", person: "$relationships.person"}}
        }
    },
    {
        $project: {
            _id: 0,
            count: {$sum: {$size: "$set"}}
        }
    },
    {
        $group: {
            _id: {count: "$count"},
            result: {"$sum": 1}
        }
    },
    {
        $project: {
            _id: 0,
            result: 1
        }
    }
]).pretty()

// test 4 - eric-di-benedetto --> {result: 15}
db.companies.aggregate([
    {$match: {"relationships.person.permalink": "eric-di-benedetto"}},
    {$project: {name: 1, relationships: 1, _id: 0}},
    {$unwind: "$relationships"},
    {$match: {"relationships.person.permalink": "eric-di-benedetto"}},
    {
        $group: {
            _id: {name: "$name", person: "$relationships.person"},
            set: {$addToSet: {name: "$name", person: "$relationships.person"}}
        }
    },
    {
        $project: {
            _id: 0,
            count: {$sum: {$size: "$set"}}
        }
    },
    {
        $group: {
            _id: {count: "$count"},
            result: {"$sum": 1}
        }
    },
    {
        $project: {
            _id: 0,
            result: 1
        }
    }
]).pretty()

// Answer
// The following is one solution to this exercise.
db.companies.aggregate([
    {$project: {relationships: 1, _id: 0, name: 1, permalink: 1}},
    {$unwind: "$relationships"},
    {
        $group: {
            _id: {person: "$relationships.person"},
            gross_companies: {$push: "$permalink"},
            unique_companies: {$addToSet: "$permalink"}
        }
    },
    {
        $project: {
            _id: 0,
            person: "$_id.person",
            gross_companies: 1,
            unique_companies: 1,
            unique_number_of_companies: {$size: "$unique_companies"},
            gross_number_of_companies: {$size: "$gross_companies"}
        }
    },
    {$sort: {unique_number_of_companies: -1}}
]).pretty()


// my experiment

db.companies.aggregate([
    {
        $match: {
            "relationships.person.permalink": {
                $in: ["roger-ehrenberg", "josh-stein", "tim-hanlon", "eric-di-benedetto"]
            }
        }
    },
    {$project: {relationships: 1, _id: 0, name: 1, permalink: 1}},
    {$unwind: "$relationships"},
    {
        $group: {
            _id: {person: "$relationships.person"},
            gross_companies: {$push: "$permalink"},
            unique_companies: {$addToSet: "$permalink"}
        }
    },
    {
        $project: {
            _id: 0,
            person: "$_id.person",
            unique_number_of_companies: {$size: "$unique_companies"},
            gross_number_of_companies: {$size: "$gross_companies"}
        }
    },
    {
        $match: {
            "person.permalink": {
                $in: ["roger-ehrenberg", "josh-stein", "tim-hanlon", "eric-di-benedetto"]
            }
        }
    },
    {
        $sort: {"person.permalik": 1}
    }
]).pretty()

/**************************************
 * Result
 * ************************************

{
    "person" : {
    "first_name" : "Tim",
        "last_name" : "Hanlon",
        "permalink" : "tim-hanlon"
},
    "unique_number_of_companies" : 28,
    "gross_number_of_companies" : 28
}
{
    "person" : {
    "first_name" : "Eric",
        "last_name" : "Di Benedetto",
        "permalink" : "eric-di-benedetto"
},
    "unique_number_of_companies" : 15,
    "gross_number_of_companies" : 23
}
{
    "person" : {
    "first_name" : "Roger",
        "last_name" : "Ehrenberg",
        "permalink" : "roger-ehrenberg"
},
    "unique_number_of_companies" : 16,
    "gross_number_of_companies" : 17
}
{
    "person" : {
    "first_name" : "Josh",
        "last_name" : "Stein",
        "permalink" : "josh-stein"
},
    "unique_number_of_companies" : 14,
    "gross_number_of_companies" : 17
}
 * ************************************/
