// Calendar POC - JavaScript Implementation
class Calendar {
    constructor() {
        this.currentDate = new Date();
        this.events = this.loadEvents();
        this.init();
    }

    init() {
        this.renderCalendar();
        this.renderEvents();
        this.setupEventListeners();
        this.setDefaultDate();
    }

    setupEventListeners() {
        document.getElementById('prevMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.renderCalendar();
        });

        document.getElementById('nextMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.renderCalendar();
        });

        document.getElementById('eventForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addEvent();
        });
    }

    setDefaultDate() {
        const today = new Date();
        const dateString = today.toISOString().split('T')[0];
        document.getElementById('eventDate').value = dateString;
    }

    renderCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();

        // Update header
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                           'July', 'August', 'September', 'October', 'November', 'December'];
        document.getElementById('currentMonth').textContent = `${monthNames[month]} ${year}`;

        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        // Clear existing calendar days
        const calendarGrid = document.getElementById('calendarGrid');
        const dayLabels = calendarGrid.querySelectorAll('.day-label');
        calendarGrid.innerHTML = '';
        dayLabels.forEach(label => calendarGrid.appendChild(label));

        // Add previous month's days
        for (let i = firstDay - 1; i >= 0; i--) {
            const day = daysInPrevMonth - i;
            const dayElement = this.createDayElement(day, true, year, month - 1);
            calendarGrid.appendChild(dayElement);
        }

        // Add current month's days
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = this.createDayElement(day, false, year, month);
            calendarGrid.appendChild(dayElement);
        }

        // Add next month's days
        const totalCells = calendarGrid.children.length - 7; // Subtract day labels
        const remainingCells = 42 - totalCells; // 6 rows * 7 days
        for (let day = 1; day <= remainingCells; day++) {
            const dayElement = this.createDayElement(day, true, year, month + 1);
            calendarGrid.appendChild(dayElement);
        }
    }

    createDayElement(day, isOtherMonth, year, month) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;

        if (isOtherMonth) {
            dayElement.classList.add('other-month');
        }

        // Check if today
        const today = new Date();
        const cellDate = new Date(year, month, day);
        if (!isOtherMonth && 
            cellDate.getDate() === today.getDate() &&
            cellDate.getMonth() === today.getMonth() &&
            cellDate.getFullYear() === today.getFullYear()) {
            dayElement.classList.add('today');
        }

        // Check for events
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        if (this.events[dateString] && this.events[dateString].length > 0) {
            dayElement.classList.add('has-events');
            const dot = document.createElement('div');
            dot.className = 'event-dot';
            dayElement.appendChild(dot);
        }

        // Click handler
        dayElement.addEventListener('click', () => {
            document.getElementById('eventDate').value = dateString;
        });

        return dayElement;
    }

    addEvent() {
        const date = document.getElementById('eventDate').value;
        const title = document.getElementById('eventTitle').value;
        const time = document.getElementById('eventTime').value;
        const description = document.getElementById('eventDescription').value;

        if (!date || !title) {
            alert('Please fill in required fields');
            return;
        }

        const event = {
            id: Date.now(),
            date,
            title,
            time,
            description
        };

        if (!this.events[date]) {
            this.events[date] = [];
        }

        this.events[date].push(event);
        this.saveEvents();
        this.renderCalendar();
        this.renderEvents();

        // Reset form
        document.getElementById('eventForm').reset();
        this.setDefaultDate();

        // Show success feedback
        alert('Event added successfully!');
    }

    deleteEvent(date, eventId) {
        if (this.events[date]) {
            this.events[date] = this.events[date].filter(e => e.id !== eventId);
            if (this.events[date].length === 0) {
                delete this.events[date];
            }
            this.saveEvents();
            this.renderCalendar();
            this.renderEvents();
        }
    }

    renderEvents() {
        const eventsList = document.getElementById('eventsList');
        eventsList.innerHTML = '';

        // Get all events and sort by date
        const allEvents = [];
        Object.keys(this.events).forEach(date => {
            this.events[date].forEach(event => {
                allEvents.push({ ...event, date });
            });
        });

        allEvents.sort((a, b) => {
            const dateCompare = new Date(a.date) - new Date(b.date);
            if (dateCompare !== 0) return dateCompare;
            return (a.time || '').localeCompare(b.time || '');
        });

        // Filter upcoming events (today and future)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const upcomingEvents = allEvents.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= today;
        });

        if (upcomingEvents.length === 0) {
            eventsList.innerHTML = '<div class="no-events">No upcoming events</div>';
            return;
        }

        upcomingEvents.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.className = 'event-item';

            const eventDate = new Date(event.date);
            const dateStr = eventDate.toLocaleDateString('en-US', { 
                weekday: 'short', 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });

            eventElement.innerHTML = `
                <div class="event-date">${dateStr}</div>
                <div class="event-title">${event.title}</div>
                ${event.time ? `<div class="event-time">⏰ ${event.time}</div>` : ''}
                ${event.description ? `<div class="event-description">${event.description}</div>` : ''}
                <button class="btn-delete" onclick="calendar.deleteEvent('${event.date}', ${event.id})">Delete</button>
            `;

            eventsList.appendChild(eventElement);
        });
    }

    saveEvents() {
        localStorage.setItem('calendarEvents', JSON.stringify(this.events));
    }

    loadEvents() {
        const saved = localStorage.getItem('calendarEvents');
        return saved ? JSON.parse(saved) : {};
    }
}

// Initialize calendar when DOM is loaded
let calendar;
document.addEventListener('DOMContentLoaded', () => {
    calendar = new Calendar();
});
