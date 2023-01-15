
// -- shorthand for managing server urls
const SERVER_URI = `http://localhost:5000`
const COURSES_API = `${SERVER_URI}/courses`

// shorthand for document.querySelector
const qs = val => document.querySelector(val)


// utils - server calls

// function calls the server & gets a single course (or, all courses if `id` was not provided)
async function getCourses(id = '') {
    return await axios.get(`${COURSES_API}/${id}`)
}

// function calls the server & creates a new course
async function createNewCourse(course_data) {
    console.log(course_data)
    return await axios.post(`${COURSES_API}`, course_data)
}

// function calls the server & updates a single course
async function updateCourse(id, new_data) {
    console.log(new_data)
    return await axios.put(`${COURSES_API}/${id}`, new_data)
}

// function calls the server & deletes a single course
async function deleteCourse(id) {
    return await axios.delete(`${COURSES_API}/${id}`)
}


// -- html event listeners

async function loadCourses() {
    const {data} = await getCourses()
    let courses_html = ``
    data.data.map(course => {
        courses_html += `
        <div style="width:15rem;height:13rem;background-color:#444;margin:.3rem;">
            <div style="position:relative;background-image:url(${course.pic_url});background-size:cover;width:100%;height:8rem">
                <h3 style="width:100%;height:100%;background:linear-gradient(to top, #000000ee, #00000033);padding:5rem 0 0 .8rem;color:white">${course.title}</h3>
                <div style="position:absolute;top:.4rem;right:.4rem;">
                    <i style="cursor:pointer;background-color:#eeeeeeee;border-radius:50%;padding:.25rem;" class="material-icons" onclick="deleteCourseHandler('${course._id}')">delete</i>
                    <i style="cursor:pointer;background-color:#eeeeeeee;border-radius:50%;padding:.25rem;" class="material-icons" onclick="editCourseHandler('${course._id}')">edit</i>
                </div>
            </div>
            <div style="width:100%;height:auto">
                <p style="color:white;padding:.2rem .5rem;text-decoration:1px underline;cursor:pointer" onclick="location.href='${course.course_link}'">${course.description}</p>
            </div>
        </div>
        `
    })
    qs('#courses').innerHTML = courses_html
}

async function editCourseHandler(id) {
    const {data} = await getCourses(id)
    qs('#update').style.display = 'block'
    qs('#update-title').innerHTML = `Updating course "${data.data.title}"`
    qs('#update-input-title').value = data.data.title
    qs('#update-input-desc').value = data.data.description
    qs('#update-input-pic_url').value = data.data.pic_url
    qs('#update-input-course_link').value = data.data.course_link
    qs('#update-input-course_id').value = data.data._id
}

async function deleteCourseHandler(id) {
    await deleteCourse(id)
    await loadCourses()
}


async function submitHandler_addCourse(e) {
    await createNewCourse({
        title: qs('#add-input-title').value,
        description: qs('#add-input-desc').value,
        pic_url: qs('#add-input-pic_url').value,
        course_link: qs('#add-input-course_link').value,
    })
    await loadCourses()
}

async function submitHandler_updateCourse(e) {
    const course_id = qs('#update-input-course_id').value
    await updateCourse(course_id, {
        title: qs('#update-input-title').value,
        description: qs('#update-input-desc').value,
        pic_url: qs('#update-input-pic_url').value,
        course_link: qs('#update-input-course_link').value,
    })
    await loadCourses()
}


// on load

loadCourses()