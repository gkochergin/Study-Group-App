// Shows every study group on the homepage, newest first.
const groupList = document.querySelector(".groupList");

async function loadGroups() {
    const { data: groups, error } = await db
        .from("groups")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        addLine(groupList, "groupMessage", "Could not load study groups: " + error.message);
        return;
    }

    if (groups.length === 0) {
        addLine(groupList, "groupMessage", "No study groups yet. Be the first to create one!");
        return;
    }

    groups.forEach((group) => groupList.appendChild(makeGroupCard(group)));
}

// Builds the card for one group
function makeGroupCard(group) {
    const card = document.createElement("div");
    card.className = "groupCard";

    addLine(card, "groupTitle", group.course_name + " - Section " + group.section_number, "h3");

    const meeting = [group.meeting_days, group.meeting_times].filter(Boolean).join(" at ");
    if (meeting) {
        addLine(card, "groupMeeting", "Meets: " + meeting);
    }

    if (group.description) {
        addLine(card, "groupDescription", group.description);
    }

    return card;
}

// Uses textContent so whatever a user typed is shown as plain text, never run as HTML
function addLine(parent, className, text, tag = "p") {
    const line = document.createElement(tag);
    line.className = className;
    line.textContent = text;
    parent.appendChild(line);
}

loadGroups();
