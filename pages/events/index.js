import { getAllEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import EventSearch from "../../components/events/events-search";
import { useRouter } from "next/router";

function AllEventsPage(props) {
    const router = useRouter();
    //const events = getAllEvents();
    //const events = props.allEvents;
    const { events } = props;

    function findEventsHandler(year, month) {
        const fullPath = `/events/${year}/${month}`;
        router.push(fullPath);
    }

    return (
        <div>
            <h1>All Events</h1>
            <EventSearch onSearch={findEventsHandler} />
            <EventList items={events} />
        </div>
    );
}

export default AllEventsPage;

export async function getStaticProps(context) {
    console.log("--- index.js - getStaticProps---------");
    //get featured events data from Firebase database
    const events = await getAllEvents();
    return {
        props: {
            events: events
        }
        ,revalidate: 60
    }
}