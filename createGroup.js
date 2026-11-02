// Saves a new study group to the database when CREATE is clicked.
const createButton = document.querySelector(".createButton");

createButton.addEventListener("click", async () => {
    const group = {
        course_name: document.querySelector(".courseBox").value.trim(),
        section_number: document.querySelector(".sectionBox").value.trim(),
        meeting_times: document.querySelector(".meetingTimes").value.trim(),
        meeting_days: document.querySelector(".meetingDays").value.trim(),
        description: document.querySelector(".description2").value.trim(),
    };

    if (!group.course_name || !group.section_number) {
        alert("Please enter a course name and section number.");
        return;
    }

    // Disable the button so a double-click doesn't create the group twice
    createButton.disabled = true;
    const { error } = await db.from("groups").insert(group);
    createButton.disabled = false;

    if (error) {
        alert("Could not create the group: " + error.message);
        return;
    }

    alert("Study group created!");
    document.querySelectorAll("input, textarea").forEach((box) => (box.value = ""));
});
