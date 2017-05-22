const router = require('express').Router();
const User = require('../db/models').User;
const Cohort = require('../db/models').Cohort;
const antiHasher = require('./util').antiHasher;
const async = require('asyncawait/async');
const await = require('asyncawait/await');

//Create A New Cohort For A Given Teacher wihtout Async
// router.post('/', (req, res) => {
//   User.findOne({where: { email: antiHasher(req.body.auth_token) }})
//     .then(teacher => {
//       Cohort.findOne({where: {teacher_id: teacher.id, subject: req.body.subject }})
//         .then(cohort => {
//           if(cohort){
//             res.status(204).send(`${teacher.fName} ${teacher.lName} already has a ${cohort.subject} cohort`);
//           } else {
//             Cohort.create({ subject: req.body.subject, teacher_id: teacher.id, user_id: teacher.id})
//               .then(newCohort => {
//                 console.log(`${teacher.fName} ${teacher.lName} just added a new ${newCohort.subject} cohort to their schedule.`, newCohort);
//                 res.status(201).send(newCohort);
//               })
//               .catch(err => {
//                 console.log(err);
//               })
//           }
//         });
//     })
//     .catch(error => {
//       console.log('Teacher Does Not Exist In The DB...');
//       res.status(404).send();
//     })
// });


//Create a New Cohort with Async
router.post('/', async((req, res) => {
  //Find a Teacher by their email and see if they are in the DB or Not...
  try{
    const teacher = await(User.findOne({where: { email: antiHasher(req.body.auth_token) }}));
    if(teacher){
      //If Teacher Found the  Find Their Cohort where subject === req.body.subject and their teacherId: as their id
      //Switch with findOrCreate
      const teacherCohort = await(Cohort.findOne({where: {teacher_id: req.body.teacher_id, subject: req.body.subject.toUpperCase() }}));
      if(teacherCohort){
        //If That cohort found then say cohort already exists
        console.log(`${teacher.fName} ${teacher.lName} already has a ${teacherCohort.subject} cohort`, teacherCohort);
        res.status(204).send(`${teacher.fName} ${teacher.lName} already has a ${teacherCohort.subject} cohort`);
      } else {
        //Else Create the Cohort
        req.body['teacher_id'] = teacher.id;
        req.body['subject'] = req.body.subject.toUpperCase();
        console.log("-------------------------\n\n\n\n\n\n\n\n\n\n\n");
        console.log("Body of request Is:", req.body);
        const newCohort = await(Cohort.create(req.body));
        if(newCohort){
          console.log(`${teacher.fName} ${teacher.lName} just added a new ${newCohort.subject} cohort to their schedule.`, newCohort);
          res.status(201).send(newCohort);
        } else {
          console.log("Failed To Create New Cohort");
        };
      }
    }
  } catch(error) {
    console.log('Teacher Does Not Exist In The DB...: ', error);
    res.status(404).send(error);
  };
}));



//Get All Cohorts For A Given Teacher without Async
// router.get('/:auth_token', (req, res) => {
//   User.findOne({where: { email: antiHasher(req.params.auth_token) }})
//     .then(teacher => {
//       Cohort.findAll({where: { teacherId: teacher.id }})
//         .then(cohorts => {
//           console.log(`${teacher.fName} ${teacher.lName}'s Cohorts Grabbed: `, cohorts);
//           res.status(200).send(cohorts);
//         })
//         .catch(err => {
//           console.log(`Coudn't Get ${teacher.fName}'s Cohorts Because: `, err);
//           res.status(404).send();
//         })
//     })
//     .catch(err => {
//       console.log("That Teacher Does Not Exist In DB: ", err);
//       res.status(404).send();
//     })
// });


//Get All Cohorts For A Given Teacher With Async
router.get('/:auth_token', async((req, res) => {
  try{
    const teacher = await(User.findOne({where: { email: antiHasher(req.params.auth_token) }}));
    if(teacher){
      const teachersCohorts = await(Cohort.findAll({where: { teacherId: teacher.id }}));
      if(teachersCohorts){
        console.log(`${teacher.fName} ${teacher.lName}'s Cohorts Grabbed: `, teachersCohorts);
        res.status(200).send(teachersCohorts);
      } else {
        console.log(`Coudn't Get ${teacher.fName}'s Cohorts Because: `, err);
        res.status(404).send();
      }
    }
  } catch(e) {
    console.log("That Teacher Does Not Exist In DB: ", e);
    res.status(404).send();
  }
}));


//Delete A Given Cohort From A Teachers List of Cohorts without Async
// router.delete('/', (req, res) => {
//   Cohort.findOne({where: {id: req.body.cohortId}})
//     .then(cohort => {
//       console.log("Cohort Was Successfully Deleted: ", cohort);
//       res.status(202).send(`${cohort} was marked for deletion...`);
//       cohort.destroy({ force: true });
//       res.status(204).send(`${cohort} was destroyed from DB`);
//     })
//     .catch(err => {
//       console.log("Error Deleting Selected Cohort... Cohort Does Not Exist: ", err);
//       res.status(404).send("Error Deleting Selected Cohort... Cohort Does Not Exist...");
//     })
// });


//Delete A Given Cohort From A Teachers List of Cohorts with Async
router.delete('/', async((req, res) => {
  try{
    const cohort = await(Cohort.findOne({where: {id: req.body.cohortId}}));
    console.log("Cohort Was Successfully Deleted: ", cohort);
    res.status(202).send(`${cohort} was marked for deletion...`);
    cohort.destroy({ force: true });
    res.status(204).send(`${cohort} was destroyed from DB`);
  } catch(e) {
    console.log("Error Deleting Selected Cohort... Cohort Does Not Exist: ", e);
    res.status(404).send("Error Deleting Selected Cohort... Cohort Does Not Exist...");
  }
}));


// //Update Information Of A Given Cohort From A Given Teacher without Async
// router.put('/', (req, res) => {
//   User.findOne({where: { email: antiHasher(req.body.auth_token) }})
//     .then(teacher => {
//       Cohort.findOne({where: {id: req.body.cohortId, teacherId: teacher.id}})
//       .then(cohort => {
//         res.status(202).send(`${cohort} was marked for updating...`);
//         cohort.subject = req.body.subject;
//         Cohort.update({
//           subject: cohort.subject
//         }, {
//           where: { id: cohort.id }
//         })
//         .then(result => {
//           res.status(200).send(result);
//         })
//         .catch(error => {
//           console.log(`Couldn't update ${teacher.fName} ${teacher.lName}'s ${cohort.subject} cohort because: `, error);
//           res.status(204).send(`Couldn't update ${teacher.fName} ${teacher.lName}'s ${cohort.subject} cohort because: `, error);
//         })
//       })
//       .catch(err => {
//         console.log(`${teacher.fName} ${teacher.lName} doesn't exist in the DB or Network Error: `, err);
//         res.status(404).send(`${teacher.fName} ${teacher.lName}'s cohort doesn't exist in the DB or Network Error: `, err)
//       })
//     })
//     .catch(error => {
//       console.log(`Teacher By The Name Of ${req.body.fName} ${req.body.lName} Does Not Exist In The Db: `, error);
//       res.status(404).send(`Teacher By The Name Of ${req.body.fName} ${req.body.lName} Does Not Exist In The Db: `, error);
//     });
// });



//Update Information Of A Given Cohort From A Given Teacher with Async
router.put('/', async((req, res) => {
  try{
    const teacher = await(User.findOne({where: { email: antiHasher(req.body.auth_token) }}));
    if(teacher){
      const cohort = await(Cohort.findOne({where: {id: req.body.cohortId, teacherId: teacher.id}}));
      if(cohort){
        res.status(202).send(`${cohort} was marked for updating...`);
        cohort.subject = req.body.subject;
        const updatedCohort = await(Cohort.update({subject: cohort.subject}, {where: { id: cohort.id }}));
        if(updatedCohort){
          res.status(200).send(updatedCohort);
        } else {
          console.log(`Couldn't update ${teacher.fName} ${teacher.lName}'s ${cohort.subject} cohort because: `, error);
          res.status(204).send(`Couldn't update ${teacher.fName} ${teacher.lName}'s ${cohort.subject} cohort because: `, error);
        }
      } else {
        console.log(`${teacher.fName} ${teacher.lName} doesn't exist in the DB or Network Error: `, err);
        res.status(404).send(`${teacher.fName} ${teacher.lName}'s cohort doesn't exist in the DB or Network Error: `, err)
      }
    } else {
      console.log(`Teacher By The Name Of ${req.body.fName} ${req.body.lName} Does Not Exist In The Db: `, error);
      res.status(404).send(`Teacher By The Name Of ${req.body.fName} ${req.body.lName} Does Not Exist In The Db: `, error);
    }
  } catch(e) {
    console.log("Async Error, Check the logs and Backend: ", e);
    res.status(404).send();
  }
}));




module.exports = router;
