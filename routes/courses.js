// controllers
const courseControllers = require('../controllers/course.controller')
// router
const router = require("express").Router()


/**
 * @description Route returns all existing courses.
 */
router.get('/', courseControllers.getCourse)


/**
 * @description Route returns a specific courses given a course_id.
 */
router.get('/:course_id', courseControllers.getCourse)


/**
 * @description Route creates a new course.
 */
router.post('/', courseControllers.createCourse)


/**
 * @description Route updates a course by a given course_id.
 */
router.put('/:course_id', courseControllers.updateCourse)


/**
 * @description Route deletes a course by a given course_id.
 */
router.delete('/:course_id', courseControllers.deleteCourse)


module.exports.courseRouter = router