import { getFilteredEvents } from '../../helpers/api-util';
import { useRouter } from "next/router";
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import { Fragment, useEffect, useState } from "react";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/events/error-alert";
import useSWRx from 'swr';

function FilteredEventsPage(props) {
    console.log("--- FilteredEventsPage ---");
    const [loadedEvents, setLoadedEvents] = useState();

    const router = useRouter();
    const filterData = router.query.slug;
    console.log(`filterData = ${filterData}`);

    const fetcher = (...args) => fetch(...args).then(res => res.json());    
    const { data, error } = useSWRx(
        'https://react-getting-started-63985-default-rtdb.asia-southeast1.firebasedatabase.app/events.json'
        , fetcher);
    //console.log(useSWR(        'https://react-getting-started-63985-default-rtdb.asia-southeast1.firebasedatabase.app/events.json'));
    console.log("after useSWR");
    console.log(`data = ${data}`);
    console.log(data);
    console.log(`error = ${error}`);
    useEffect(() => {
        if(data) {
            const events = [];
            console.log("---------data fetched---------");
            //console.log(data);
            for(const key in data) {
                events.push(
                    {
                        id: key,
                        ...data[key]
                    }
                );
            }
            setLoadedEvents(events);
        }
    }, [data]);

    if(!loadedEvents) {
        return <p className='center'>Loading...</p>
    }

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];
    
    //transform to number, using '+' 
    const numYear = +filteredYear;
    const numMonth = +filteredMonth;
    if(isNaN(numYear) || isNaN(numMonth) || numYear < 2021 || numMonth < 1 || numMonth > 12 || error) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>Invalid Filter, please adjust values.</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </Fragment>
            );
    }

    const filteredEvents = loadedEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
      });

    //const filteredEvents = props.events;
    if(!filteredEvents || filteredEvents.length === 0) {
        return (
        <Fragment>
            <ErrorAlert>
                <p>No event found for the chosen filter.</p>
            </ErrorAlert>
            <div className='center'>
                <Button link='/events'>Show All Events</Button>
            </div>
        </Fragment>);
    }

    const date = new Date(numYear, numMonth - 1);
    return (
        <Fragment>
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </Fragment>
        
    );
}

/* export async function getServerSideProps (context) {
    const { params } = context;
    const filterData = params.slug;
    console.log(`filterData = ${filterData}`);
    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];
    
    //transform to number, using '+' 
    const numYear = +filteredYear;
    const numMonth = +filteredMonth;
    if(isNaN(numYear) || isNaN(numMonth) || numYear < 2021 || numMonth < 1 || numMonth > 12) {
        //return an object with hasError
        return {
            props: { hasError: true },
            //notFound: true,
            //redirect: {
            //    destination: '/error'
            //}
        }
    }

    const filteredEvents = await getFilteredEvents(
        { year: numYear, month: numMonth}
    );
    console.log(`filteredEvents = ${filteredEvents}`);
    //console.log(filteredEvents);

    //return an object with properties events and date
    return {
        props: {
            events: filteredEvents,
            date: {
                year: numYear,
                month: numMonth
            }
        }
    };
} */

export default FilteredEventsPage;
