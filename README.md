# 📅 Add Calendar - POC

A Proof of Concept (POC) for a web-based calendar application with event management capabilities.

## Features

✨ **Interactive Calendar Display**
- Monthly calendar view with navigation
- Current day highlighting
- Visual indicators for days with events
- Responsive design for mobile and desktop

🎯 **Event Management**
- Add events with title, date, time, and description
- View upcoming events in chronological order
- Delete events
- Persistent storage using localStorage

🎨 **Modern UI**
- Clean, gradient-based design
- Smooth animations and transitions
- Mobile-responsive layout
- Intuitive user interface

## Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rotem-blik/add-calendar.git
   cd add-calendar
   ```

2. **Open the application:**
   - Simply open `index.html` in your web browser
   - No build process or dependencies required!

3. **Start using:**
   - Navigate through months using the arrow buttons
   - Click on any date to select it for adding an event
   - Fill in the event form and click "Add Event"
   - View your upcoming events in the right panel
   - Delete events as needed

## File Structure

```
add-calendar/
├── index.html      # Main HTML structure
├── styles.css      # Styling and layout
├── calendar.js     # Calendar logic and event handling
└── README.md       # Documentation
```

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients and animations
- **Vanilla JavaScript** - No frameworks or dependencies
- **localStorage** - Client-side data persistence

## How It Works

### Calendar Rendering
The calendar automatically displays the current month and year. It calculates:
- First day of the month to determine grid positioning
- Number of days in the month
- Previous and next month overflow days for a complete grid

### Event Storage
Events are stored in the browser's localStorage as JSON:
```json
{
  "2026-01-15": [
    {
      "id": 1736329329123,
      "date": "2026-01-15",
      "title": "Team Meeting",
      "time": "14:00",
      "description": "Weekly sync"
    }
  ]
}
```

### Key Features Implementation

1. **Month Navigation**: Click arrows to move between months
2. **Event Addition**: Form validation ensures required fields are filled
3. **Visual Feedback**: Days with events show a colored border and dot indicator
4. **Today Highlighting**: Current day is highlighted with a special color
5. **Responsive Design**: Grid layout adapts to screen size

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Future Enhancements

Potential features for expansion:
- Event editing capabilities
- Multiple calendar views (week, day, agenda)
- Event categories and color coding
- Event search and filtering
- Export to iCal/Google Calendar
- Recurring events
- Event reminders/notifications
- Multi-user support with backend

## License

This is a POC (Proof of Concept) project for demonstration purposes.

## Contributing

This is a POC project. Feel free to fork and experiment!

---

**Created with ❤️ as a calendar POC**
