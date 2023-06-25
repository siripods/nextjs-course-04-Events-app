export async function getAllEvents() {
    console.log("---------api-utils.js : getAllEvents---------");
    const response = await fetch('https://react-getting-started-63985-default-rtdb.asia-southeast1.firebasedatabase.app/events.json');
    const data = await response.json();
    const events = [];
    //console.log("---------data fetched---------");
    //console.log(data);
    for(const key in data) {
        events.push(
            {
                id: key,
                ...data[key]
            }
        )
    }

    return events;
}

export async function getFeaturedEvents() {
    console.log("---------api-utils.js : getFeaturedEvents---------");
    const allEvents = await getAllEvents();
    return allEvents.filter((event) => event.isFeatured);
}   


export async function getEventById(id) {
    console.log("---------api-utils.js : getEventById---------");
    const allEvents = await getAllEvents();
    return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
    const { year, month } = dateFilter;
    const allEvents = await getAllEvents();

    let filteredEvents = allEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });
  
    return filteredEvents;
  }