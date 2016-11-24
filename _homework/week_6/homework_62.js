/**
 * Created by Vladimir Deminenko on 23.11.2016.
 */

// Download Handouts:
//     grades.zip - https://university.mongodb.com/static/MongoDB_2016_M101JS_October/handouts/grades.18e6086d0c40.zip
//
// Who is the easiest grader on campus?
//
//     Download the handout and import the grades collection using the following command.
// mongoimport --drop -d test -c grades grades.json


/*******************************************************
 Documents in the grades collection look like this.
 {
     "_id" : ObjectId("50b59cd75bed76f46522c392"),
     "student_id" : 10,
     "class_id" : 5,
     "scores" : [
     {
         "type" : "exam",
         "score" : 69.17634380939022
     },
     {
         "type" : "quiz",
         "score" : 61.20182926719762
     },
     {
         "type" : "homework",
         "score" : 73.3293624199466
     },
     {
         "type" : "homework",
         "score" : 15.206314042622903
     },
     {
         "type" : "homework",
         "score" : 36.75297723087603
     },
     {
         "type" : "homework",
         "score" : 64.42913107330241
     }
 ]
 }
 ********************************************************/

// There are documents for each student (student_id) across a variety of classes (class_id).
// Note that not all students in the same class have the same exact number of assessments.
// Some students have three homework assignments, etc.
//
//     Your task is to calculate the class with the best average student performance.
// This involves calculating an average for each student in each class of all non-quiz assessments and
// then averaging those numbers to get a class average.
// To be clear, each student's average should include only exams and homework grades.
// Don't include their quiz scores in the calculation.
//
//     What is the class_id which has the highest average student performance?
// Choose the correct class_id below.
// 0 1 5 6 7 8 9

// step 1, start
db.grades.find().pretty();
// result:
/*
 {
 "_id" : ObjectId("50b59cd75bed76f46522c352"),
 "student_id" : 0,
 "class_id" : 24,
 "scores" : [
 {
 "type" : "exam",
 "score" : 4.444435759027499
 },
 {
 "type" : "quiz",
 "score" : 28.63057857803885
 },
 {
 "type" : "homework",
 "score" : 86.79352850434199
 },
 {
 "type" : "homework",
 "score" : 83.9164548767836
 }
 ]
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c34e"),
 "student_id" : 0,
 "class_id" : 2,
 "scores" : [
 {
 "type" : "exam",
 "score" : 57.92947112575566
 },
 {
 "type" : "quiz",
 "score" : 21.24542588206755
 },
 {
 "type" : "homework",
 "score" : 68.1956781058743
 },
 {
 "type" : "homework",
 "score" : 67.95019716560351
 },
 {
 "type" : "homework",
 "score" : 18.81037253352722
 }
 ]
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c350"),
 "student_id" : 0,
 "class_id" : 5,
 "scores" : [
 {
 "type" : "exam",
 "score" : 88.22950674232497
 },
 {
 "type" : "quiz",
 "score" : 79.28962650427184
 },
 {
 "type" : "homework",
 "score" : 18.66254946562674
 },
 {
 "type" : "homework",
 "score" : 40.28154176513361
 },
 {
 "type" : "homework",
 "score" : 1.23735944117882
 },
 {
 "type" : "homework",
 "score" : 88.96101200683958
 }
 ]
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c356"),
 "student_id" : 0,
 "class_id" : 27,
 "scores" : [
 {
 "type" : "exam",
 "score" : 60.19473636151568
 },
 {
 "type" : "quiz",
 "score" : 64.15966210014162
 },
 {
 "type" : "homework",
 "score" : 82.80835343023551
 }
 ]
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c355"),
 "student_id" : 0,
 "class_id" : 6,
 "scores" : [
 {
 "type" : "exam",
 "score" : 56.81981513867912
 },
 {
 "type" : "quiz",
 "score" : 15.03004654140545
 },
 {
 "type" : "homework",
 "score" : 59.58797547174019
 },
 {
 "type" : "homework",
 "score" : 67.42173915928456
 },
 {
 "type" : "homework",
 "score" : 71.25502554312342
 },
 {
 "type" : "homework",
 "score" : 94.46662737566072
 }
 ]
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c357"),
 "student_id" : 0,
 "class_id" : 11,
 "scores" : [
 {
 "type" : "exam",
 "score" : 58.83297411100884
 },
 {
 "type" : "quiz",
 "score" : 49.66835710930263
 },
 {
 "type" : "homework",
 "score" : 18.05861540807023
 },
 {
 "type" : "homework",
 "score" : 80.04086698967356
 }
 ]
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c359"),
 "student_id" : 1,
 "class_id" : 18,
 "scores" : [
 {
 "type" : "exam",
 "score" : 63.09737877102438
 },
 {
 "type" : "quiz",
 "score" : 69.08175868397933
 },
 {
 "type" : "homework",
 "score" : 34.6879008789745
 }
 ]
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c358"),
 "student_id" : 0,
 "class_id" : 10,
 "scores" : [
 {
 "type" : "exam",
 "score" : 30.93065784731665
 },
 {
 "type" : "quiz",
 "score" : 55.98003281528393
 },
 {
 "type" : "homework",
 "score" : 55.6752702814148
 },
 {
 "type" : "homework",
 "score" : 63.15391302252755
 }
 ]
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c35c"),
 "student_id" : 1,
 "class_id" : 16,
 "scores" : [
 {
 "type" : "exam",
 "score" : 80.6212442791788
 },
 {
 "type" : "quiz",
 "score" : 40.64514700062569
 },
 {
 "type" : "homework",
 "score" : 91.50521146788955
 },
 {
 "type" : "homework",
 "score" : 82.1425639828968
 },
 {
 "type" : "homework",
 "score" : 16.64633943981927
 }
 ]
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c35a"),
 "student_id" : 1,
 "class_id" : 22,
 "scores" : [
 {
 "type" : "exam",
 "score" : 47.38775906993299
 },
 {
 "type" : "quiz",
 "score" : 9.963742963372834
 },
 {
 "type" : "homework",
 "score" : 22.17993073237026
 },
 {
 "type" : "homework",
 "score" : 33.7647119689925
 },
 {
 "type" : "homework",
 "score" : 18.29543263797219
 }
 ]
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c35d"),
 "student_id" : 1,
 "class_id" : 13,
 "scores" : [
 {
 "type" : "exam",
 "score" : 68.93370297588363
 },
 {
 "type" : "quiz",
 "score" : 65.39942932033274
 },
 {
 "type" : "homework",
 "score" : 43.10650652263911
 },
 {
 "type" : "homework",
 "score" : 56.89478543605922
 }
 ]
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c35b"),
 "student_id" : 1,
 "class_id" : 28,
 "scores" : [
 {
 "type" : "exam",
 "score" : 24.05118737353409
 },
 {
 "type" : "quiz",
 "score" : 77.89233366199049
 },
 {
 "type" : "homework",
 "score" : 68.81640554493546
 },
 {
 "type" : "homework",
 "score" : 87.88279757549473
 },
 {
 "type" : "homework",
 "score" : 83.36858109902629
 }
 ]
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c35f"),
 "student_id" : 2,
 "class_id" : 27,
 "scores" : [
 {
 "type" : "exam",
 "score" : 70.32953992025745
 },
 {
 "type" : "quiz",
 "score" : 66.24220071248318
 },
 {
 "type" : "homework",
 "score" : 79.21965885764142
 },
 {
 "type" : "homework",
 "score" : 78.68052791237751
 }
 ]
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c35e"),
 "student_id" : 2,
 "class_id" : 25,
 "scores" : [
 {
 "type" : "exam",
 "score" : 5.231166018738698
 },
 {
 "type" : "quiz",
 "score" : 9.922444955766851
 },
 {
 "type" : "homework",
 "score" : 76.7208591903267
 },
 {
 "type" : "homework",
 "score" : 41.14461420390943
 },
 {
 "type" : "homework",
 "score" : 30.18199391733215
 }
 ]
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c361"),
 "student_id" : 3,
 "class_id" : 10,
 "scores" : [
 {
 "type" : "exam",
 "score" : 35.47946463550763
 },
 {
 "type" : "quiz",
 "score" : 94.14222652833352
 },
 {
 "type" : "homework",
 "score" : 58.43343860077279
 },
 {
 "type" : "homework",
 "score" : 66.83562834109681
 }
 ]
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c360"),
 "student_id" : 2,
 "class_id" : 24,
 "scores" : [
 {
 "type" : "exam",
 "score" : 76.01876674517686
 },
 {
 "type" : "quiz",
 "score" : 47.44729578274631
 },
 {
 "type" : "homework",
 "score" : 4.735101893467009
 },
 {
 "type" : "homework",
 "score" : 92.65331076863312
 }
 ]
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c362"),
 "student_id" : 3,
 "class_id" : 9,
 "scores" : [
 {
 "type" : "exam",
 "score" : 47.71786215806567
 },
 {
 "type" : "quiz",
 "score" : 82.48705096247578
 },
 {
 "type" : "homework",
 "score" : 75.44141239006737
 },
 {
 "type" : "homework",
 "score" : 93.67951940270194
 },
 {
 "type" : "homework",
 "score" : 59.86914451038889
 },
 {
 "type" : "homework",
 "score" : 79.22570296763764
 }
 ]
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c366"),
 "student_id" : 3,
 "class_id" : 3,
 "scores" : [
 {
 "type" : "exam",
 "score" : 86.2587791014086
 },
 {
 "type" : "quiz",
 "score" : 0.7165465872248866
 },
 {
 "type" : "homework",
 "score" : 70.07859698701473
 },
 {
 "type" : "homework",
 "score" : 61.00984159293741
 }
 ]
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c363"),
 "student_id" : 3,
 "class_id" : 25,
 "scores" : [
 {
 "type" : "exam",
 "score" : 88.80822542748272
 },
 {
 "type" : "quiz",
 "score" : 42.19859496158491
 },
 {
 "type" : "homework",
 "score" : 14.97229131876052
 },
 {
 "type" : "homework",
 "score" : 39.93448876447816
 }
 ]
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c365"),
 "student_id" : 3,
 "class_id" : 11,
 "scores" : [
 {
 "type" : "exam",
 "score" : 95.7950561891157
 },
 {
 "type" : "quiz",
 "score" : 99.70947557740388
 },
 {
 "type" : "homework",
 "score" : 91.7396297504769
 },
 {
 "type" : "homework",
 "score" : 96.83139133632076
 },
 {
 "type" : "homework",
 "score" : 50.26710948208495
 }
 ]
 }
 Type "it" for more
 */

// step 2
db.grades.aggregate([
    {
        $unwind: "$scores"
    }
]).pretty();
// result:
/*
 {
 "_id" : ObjectId("50b59cd75bed76f46522c352"),
 "student_id" : 0,
 "class_id" : 24,
 "scores" : {
 "type" : "exam",
 "score" : 4.444435759027499
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c352"),
 "student_id" : 0,
 "class_id" : 24,
 "scores" : {
 "type" : "quiz",
 "score" : 28.63057857803885
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c352"),
 "student_id" : 0,
 "class_id" : 24,
 "scores" : {
 "type" : "homework",
 "score" : 86.79352850434199
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c352"),
 "student_id" : 0,
 "class_id" : 24,
 "scores" : {
 "type" : "homework",
 "score" : 83.9164548767836
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c34e"),
 "student_id" : 0,
 "class_id" : 2,
 "scores" : {
 "type" : "exam",
 "score" : 57.92947112575566
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c34e"),
 "student_id" : 0,
 "class_id" : 2,
 "scores" : {
 "type" : "quiz",
 "score" : 21.24542588206755
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c34e"),
 "student_id" : 0,
 "class_id" : 2,
 "scores" : {
 "type" : "homework",
 "score" : 68.1956781058743
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c34e"),
 "student_id" : 0,
 "class_id" : 2,
 "scores" : {
 "type" : "homework",
 "score" : 67.95019716560351
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c34e"),
 "student_id" : 0,
 "class_id" : 2,
 "scores" : {
 "type" : "homework",
 "score" : 18.81037253352722
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c350"),
 "student_id" : 0,
 "class_id" : 5,
 "scores" : {
 "type" : "exam",
 "score" : 88.22950674232497
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c350"),
 "student_id" : 0,
 "class_id" : 5,
 "scores" : {
 "type" : "quiz",
 "score" : 79.28962650427184
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c350"),
 "student_id" : 0,
 "class_id" : 5,
 "scores" : {
 "type" : "homework",
 "score" : 18.66254946562674
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c350"),
 "student_id" : 0,
 "class_id" : 5,
 "scores" : {
 "type" : "homework",
 "score" : 40.28154176513361
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c350"),
 "student_id" : 0,
 "class_id" : 5,
 "scores" : {
 "type" : "homework",
 "score" : 1.23735944117882
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c350"),
 "student_id" : 0,
 "class_id" : 5,
 "scores" : {
 "type" : "homework",
 "score" : 88.96101200683958
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c356"),
 "student_id" : 0,
 "class_id" : 27,
 "scores" : {
 "type" : "exam",
 "score" : 60.19473636151568
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c356"),
 "student_id" : 0,
 "class_id" : 27,
 "scores" : {
 "type" : "quiz",
 "score" : 64.15966210014162
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c356"),
 "student_id" : 0,
 "class_id" : 27,
 "scores" : {
 "type" : "homework",
 "score" : 82.80835343023551
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c355"),
 "student_id" : 0,
 "class_id" : 6,
 "scores" : {
 "type" : "exam",
 "score" : 56.81981513867912
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c355"),
 "student_id" : 0,
 "class_id" : 6,
 "scores" : {
 "type" : "quiz",
 "score" : 15.03004654140545
 }
 }
 Type "it" for more
 */


// step 3
db.grades.aggregate([
    {
        $unwind: "$scores"
    },
    {
        $match: {"scores.type": {$ne: "quiz"}}
    }
]).pretty();
// result:
/*
 {
 "_id" : ObjectId("50b59cd75bed76f46522c352"),
 "student_id" : 0,
 "class_id" : 24,
 "scores" : {
 "type" : "exam",
 "score" : 4.444435759027499
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c352"),
 "student_id" : 0,
 "class_id" : 24,
 "scores" : {
 "type" : "homework",
 "score" : 86.79352850434199
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c352"),
 "student_id" : 0,
 "class_id" : 24,
 "scores" : {
 "type" : "homework",
 "score" : 83.9164548767836
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c34e"),
 "student_id" : 0,
 "class_id" : 2,
 "scores" : {
 "type" : "exam",
 "score" : 57.92947112575566
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c34e"),
 "student_id" : 0,
 "class_id" : 2,
 "scores" : {
 "type" : "homework",
 "score" : 68.1956781058743
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c34e"),
 "student_id" : 0,
 "class_id" : 2,
 "scores" : {
 "type" : "homework",
 "score" : 67.95019716560351
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c34e"),
 "student_id" : 0,
 "class_id" : 2,
 "scores" : {
 "type" : "homework",
 "score" : 18.81037253352722
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c350"),
 "student_id" : 0,
 "class_id" : 5,
 "scores" : {
 "type" : "exam",
 "score" : 88.22950674232497
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c350"),
 "student_id" : 0,
 "class_id" : 5,
 "scores" : {
 "type" : "homework",
 "score" : 18.66254946562674
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c350"),
 "student_id" : 0,
 "class_id" : 5,
 "scores" : {
 "type" : "homework",
 "score" : 40.28154176513361
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c350"),
 "student_id" : 0,
 "class_id" : 5,
 "scores" : {
 "type" : "homework",
 "score" : 1.23735944117882
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c350"),
 "student_id" : 0,
 "class_id" : 5,
 "scores" : {
 "type" : "homework",
 "score" : 88.96101200683958
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c356"),
 "student_id" : 0,
 "class_id" : 27,
 "scores" : {
 "type" : "exam",
 "score" : 60.19473636151568
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c356"),
 "student_id" : 0,
 "class_id" : 27,
 "scores" : {
 "type" : "homework",
 "score" : 82.80835343023551
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c355"),
 "student_id" : 0,
 "class_id" : 6,
 "scores" : {
 "type" : "exam",
 "score" : 56.81981513867912
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c355"),
 "student_id" : 0,
 "class_id" : 6,
 "scores" : {
 "type" : "homework",
 "score" : 59.58797547174019
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c355"),
 "student_id" : 0,
 "class_id" : 6,
 "scores" : {
 "type" : "homework",
 "score" : 67.42173915928456
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c355"),
 "student_id" : 0,
 "class_id" : 6,
 "scores" : {
 "type" : "homework",
 "score" : 71.25502554312342
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c355"),
 "student_id" : 0,
 "class_id" : 6,
 "scores" : {
 "type" : "homework",
 "score" : 94.46662737566072
 }
 }
 {
 "_id" : ObjectId("50b59cd75bed76f46522c357"),
 "student_id" : 0,
 "class_id" : 11,
 "scores" : {
 "type" : "exam",
 "score" : 58.83297411100884
 }
 }
 Type "it" for more
 */


// step 4
db.grades.aggregate([
    {
        $unwind: "$scores"
    },
    {
        $match: {"scores.type": {$ne: "quiz"}}
    },
    {
        $group: {
            _id: {
                student: "$student_id",
                class: "$class_id"
            },
            student_average_score: {
                $avg: "$scores.score"
            }
        }
    }
]);
// result:
/*
 { "_id" : { "student" : 48, "class" : 8 }, "student_average_score" : 65.6490657975775 }
 { "_id" : { "student" : 48, "class" : 15 }, "student_average_score" : 43.58194656591837 }
 { "_id" : { "student" : 49, "class" : 29 }, "student_average_score" : 22.281622173245808 }
 { "_id" : { "student" : 48, "class" : 10 }, "student_average_score" : 28.040288666424395 }
 { "_id" : { "student" : 48, "class" : 14 }, "student_average_score" : 75.40764716796762 }
 { "_id" : { "student" : 48, "class" : 2 }, "student_average_score" : 15.106667531111501 }
 { "_id" : { "student" : 46, "class" : 20 }, "student_average_score" : 62.06947485161923 }
 { "_id" : { "student" : 47, "class" : 22 }, "student_average_score" : 50.925161336642816 }
 { "_id" : { "student" : 46, "class" : 3 }, "student_average_score" : 33.64734411613102 }
 { "_id" : { "student" : 45, "class" : 6 }, "student_average_score" : 53.63529012612206 }
 { "_id" : { "student" : 45, "class" : 29 }, "student_average_score" : 46.01117661122032 }
 { "_id" : { "student" : 40, "class" : 16 }, "student_average_score" : 46.35429983800899 }
 { "_id" : { "student" : 40, "class" : 14 }, "student_average_score" : 59.577326917155894 }
 { "_id" : { "student" : 45, "class" : 25 }, "student_average_score" : 50.71689974165258 }
 { "_id" : { "student" : 44, "class" : 7 }, "student_average_score" : 57.62236170621891 }
 { "_id" : { "student" : 40, "class" : 2 }, "student_average_score" : 18.62773101890161 }
 { "_id" : { "student" : 39, "class" : 28 }, "student_average_score" : 37.81660531755959 }
 { "_id" : { "student" : 45, "class" : 13 }, "student_average_score" : 59.39900627513573 }
 { "_id" : { "student" : 44, "class" : 21 }, "student_average_score" : 54.71295284245051 }
 { "_id" : { "student" : 44, "class" : 1 }, "student_average_score" : 79.72539218904846 }
 Type "it" for more
 */


// step 5
db.grades.aggregate([
    {
        $unwind: "$scores"
    },
    {
        $match: {"scores.type": {$ne: "quiz"}}
    },
    {
        $group: {
            _id: {
                student: "$student_id",
                class: "$class_id"
            },
            student_average_score: {
                $avg: "$scores.score"
            }
        }
    },
    {
        $group: {
            _id: {
                class: "$_id.class"
            },
            class_average_score: {
                $avg: "$student_average_score"
            }
        }
    }
]);
// result:
/*
 { "_id" : { "class" : 12 }, "class_average_score" : 40.62345969481145 }
 { "_id" : { "class" : 4 }, "class_average_score" : 52.65541561065859 }
 { "_id" : { "class" : 9 }, "class_average_score" : 55.56861693456624 }
 { "_id" : { "class" : 24 }, "class_average_score" : 53.610345978016596 }
 { "_id" : { "class" : 19 }, "class_average_score" : 50.590719286350925 }
 { "_id" : { "class" : 30 }, "class_average_score" : 42.71200726236121 }
 { "_id" : { "class" : 17 }, "class_average_score" : 52.42469177746091 }
 { "_id" : { "class" : 26 }, "class_average_score" : 56.06918278769095 }
 { "_id" : { "class" : 0 }, "class_average_score" : 50.6431769584895 }
 { "_id" : { "class" : 23 }, "class_average_score" : 51.93284830763039 }
 { "_id" : { "class" : 18 }, "class_average_score" : 43.40692681712815 }
 { "_id" : { "class" : 27 }, "class_average_score" : 50.58111308566053 }
 { "_id" : { "class" : 11 }, "class_average_score" : 49.952812365344215 }
 { "_id" : { "class" : 5 }, "class_average_score" : 58.08448767613548 }
 { "_id" : { "class" : 1 }, "class_average_score" : 64.50642324269175 }
 { "_id" : { "class" : 21 }, "class_average_score" : 45.41539323359457 }
 { "_id" : { "class" : 13 }, "class_average_score" : 52.738286239952366 }
 { "_id" : { "class" : 28 }, "class_average_score" : 41.59824801397288 }
 { "_id" : { "class" : 7 }, "class_average_score" : 48.877087980134746 }
 { "_id" : { "class" : 25 }, "class_average_score" : 43.99882003240129 }
 Type "it" for more
 */


// step 6
db.grades.aggregate([
    {
        $unwind: "$scores"
    },
    {
        $match: {"scores.type": {$ne: "quiz"}}
    },
    {
        $group: {
            _id: {
                student: "$student_id",
                class: "$class_id"
            },
            student_average_score: {
                $avg: "$scores.score"
            }
        }
    },
    {
        $group: {
            _id: {
                class: "$_id.class"
            },
            class_average_score: {
                $avg: "$student_average_score"
            }
        }
    },
    {
        $sort: {
            class_average_score: -1
        }
    }
]);
// result:
/*
 { "_id" : { "class" : 1 }, "class_average_score" : 64.50642324269175 }
 { "_id" : { "class" : 5 }, "class_average_score" : 58.08448767613548 }
 { "_id" : { "class" : 20 }, "class_average_score" : 57.6309834548989 }
 { "_id" : { "class" : 26 }, "class_average_score" : 56.06918278769095 }
 { "_id" : { "class" : 9 }, "class_average_score" : 55.56861693456624 }
 { "_id" : { "class" : 14 }, "class_average_score" : 55.36017373346245 }
 { "_id" : { "class" : 24 }, "class_average_score" : 53.610345978016596 }
 { "_id" : { "class" : 16 }, "class_average_score" : 53.45833539362425 }
 { "_id" : { "class" : 13 }, "class_average_score" : 52.738286239952366 }
 { "_id" : { "class" : 4 }, "class_average_score" : 52.65541561065859 }
 { "_id" : { "class" : 17 }, "class_average_score" : 52.42469177746091 }
 { "_id" : { "class" : 23 }, "class_average_score" : 51.93284830763039 }
 { "_id" : { "class" : 3 }, "class_average_score" : 51.7742498662982 }
 { "_id" : { "class" : 0 }, "class_average_score" : 50.6431769584895 }
 { "_id" : { "class" : 19 }, "class_average_score" : 50.590719286350925 }
 { "_id" : { "class" : 27 }, "class_average_score" : 50.58111308566053 }
 { "_id" : { "class" : 11 }, "class_average_score" : 49.952812365344215 }
 { "_id" : { "class" : 29 }, "class_average_score" : 49.305440602697246 }
 { "_id" : { "class" : 7 }, "class_average_score" : 48.877087980134746 }
 { "_id" : { "class" : 6 }, "class_average_score" : 48.414852429568235 }
 Type "it" for more
 */


// step 7
db.grades.aggregate([
    {
        $unwind: "$scores"
    },
    {
        $match: {"scores.type": {$ne: "quiz"}}
    },
    {
        $group: {
            _id: {
                student: "$student_id",
                class: "$class_id"
            },
            student_average_score: {
                $avg: "$scores.score"
            }
        }
    },
    {
        $group: {
            _id: {
                class: "$_id.class"
            },
            class_average_score: {
                $avg: "$student_average_score"
            }
        }
    },
    {
        $sort: {
            class_average_score: -1
        }
    },
    {
        $limit: 1
    }
]);
// result:
/*
 { "_id" : { "class" : 1 }, "class_average_score" : 64.50642324269175 }
 */


// step 8, finale
db.grades.aggregate([
    {
        $unwind: "$scores"
    },
    {
        $match: {"scores.type": {$ne: "quiz"}}
    },
    {
        $group: {
            _id: {
                student: "$student_id",
                class: "$class_id"
            },
            student_average_score: {
                $avg: "$scores.score"
            }
        }
    },
    {
        $group: {
            _id: {
                class: "$_id.class"
            },
            class_average_score: {
                $avg: "$student_average_score"
            }
        }
    },
    {
        $sort: {
            class_average_score: -1
        }
    },
    {
        $limit: 1
    },
    {
        $project: {
            _id: 0,
            "answer": {
                "$concat": [
                    "The class_id which has the highest average student performance is ",
                    {
                        "$substr": ["$_id.class", 0, -1]
                    },
                    "."
                ]
            }
        }
    }
]);
// result:
/*
 { "answer" : "The class_id which has the highest average student performance is 1." }
 */
