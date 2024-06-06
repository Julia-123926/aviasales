export default function filterAndSortTickets(tickets, filters, sorting) {
  const filteredTickets = tickets.filter((ticket) => {
    const [goThereSegment, goBackSegment] = ticket.segments;
    const hasNoStops = goThereSegment.stops.length === 0 || goBackSegment.stops.length === 0;
    const hasOneStop = goThereSegment.stops.length === 1 || goBackSegment.stops.length === 1;
    const hasTwoStops = goThereSegment.stops.length === 2 || goBackSegment.stops.length === 2;
    const hasThreeStops = goThereSegment.stops.length === 3 || goBackSegment.stops.length === 3;
    if (filters.all) {
      return true;
    }
    if (filters.noStops && hasNoStops) {
      return true;
    }
    if (filters.oneStop && hasOneStop) {
      return true;
    }
    if (filters.twoStops && hasTwoStops) {
      return true;
    }
    if (filters.threeStops && hasThreeStops) {
      return true;
    }

    return false;
  });

  if (sorting === "САМЫЙ ДЕШЕВЫЙ") {
    return filteredTickets.sort((a, b) => a.price - b.price);
  }

  if (sorting === "САМЫЙ БЫСТРЫЙ" || sorting === "ОПТИМАЛЬНЫЙ") {
    return filteredTickets.sort((a, b) => {
      const durationA = a.segments.reduce((acc, segment) => acc + segment.duration, 0);
      const durationB = b.segments.reduce((acc, segment) => acc + segment.duration, 0);
      return durationA - durationB;
    });
  }

  return filteredTickets;
}
