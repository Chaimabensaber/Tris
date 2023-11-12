document.addEventListener('DOMContentLoaded', function () {
    showSection(1);
});

function showSection(sectionNumber) {
    for (let i = 1; i <= 3; i++) {
        const section = document.getElementById('section' + i);
        if (section) {
            section.style.display = 'none';
        }
    }

    const activeSection = document.getElementById('section' + sectionNumber);
    if (activeSection) {
        activeSection.style.display = 'block';
    }
}
