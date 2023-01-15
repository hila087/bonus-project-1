// courses controller file - functionallity for each route

const { Course } = require("../models/course.model")


// controller gets a course by a given id (or, all courses if id not provided)
module.exports.getCourse = async (req, res) => {
    try {
        if (req.params['course_id']) {
            // -- get a specific course by an id
            const course = await Course.findById(req.params['course_id'])
            res.status(200).json({status: true, data: course}).end()
        }
        else {
            // -- id not specified - get all courses
            const all_courses = await Course.find()
            res.status(200).json({status: true, data: all_courses}).end()    
        }
    }
    catch (err) {
        res.status(400).json({status: false, msg: 'something went wrong'}).end()
    }
}


// controller creates a new course
module.exports.createCourse = async (req, res) => {
    try {
        const new_course = await new Course({ ...req.body }).save()
        res.status(201).json({status: true, msg: 'created course successfully'}).end()
    }    
    catch (err) {
        res.status(400).json({status: false, msg: 'something went wrong'}).end()
    }    
}    


// controller updates an existing course
module.exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params['course_id'], {$set: req.body})
        res.status(200).json({status: true, msg: 'course updated successfully'}).end()
    }    
    catch (err) {
        res.status(400).json({status: false, msg: 'something went wrong'}).end()
    }    
}    


// controller deletes an existing course
module.exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params['course_id'])
        res.status(204).json({status: true, msg: 'course deleted successfully'}).end()
    }    
    catch (err) {
        res.status(400).json({status: false, msg: 'something went wrong'}).end()
    }    
}    
