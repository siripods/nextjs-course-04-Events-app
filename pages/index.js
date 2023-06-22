//import { getFeaturedEvents } from "../dummy-data";
import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util";

function HomePage(props) {
    
    return (
        <div>
            <EventList items={props.events} />
        </div>
    );
}

//because we do not need to pre-render it for every request, we use getStaticProps
//this function returns an object with the props for this homepage component
export async function getStaticProps(context) {
    console.log("--- index.js - getStaticProps---------");
    //get featured events data from Firebase database
    const featuredEvents = await getFeaturedEvents();
    return {
        props: {
            events: featuredEvents
        }
        ,revalidate: 10
    }
}

export default HomePage;