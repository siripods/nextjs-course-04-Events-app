import { useRouter } from 'next/router';
//import { getEventById } from '../../dummy-data';
import { Fragment } from 'react';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from "../../components/events/error-alert";
import { getEventById, getAllEvents, getFeaturedEvents } from '../../helpers/api-util';

function EventDetailPage(props) {
    const event = props.selectedEvent;
    if(!event) {
        return (
        <div className="center">
            <p>Loading...</p>
        </div>);
    }
    //console.log(event);
    return (
        <Fragment>
            <EventSummary title={event.title}/>
            <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </Fragment>
    );
}

export default EventDetailPage;

export async function getStaticProps(context) {
    console.log("---------getStaticProps---------");
    const eventId = context.params.eventId;
    const event = await getEventById(eventId);
    
    return {
        props: {
            selectedEvent: event
        },
        revalidate: 60
    };
}

export async function getStaticPaths() {
    const events = await getFeaturedEvents();
    const paths = events.map(event => ({params: { eventId: event.id}}));
    //const paths = [];
    console.log("--- [eventId].js getStaticPaths ---")
    console.log(paths);
    // fallback = 'blocking', so that NextJS will do nothing until page is generated
    return {
        paths: paths,
        fallback: 'blocking'
    };
}