import { useEffect, useMemo, useState } from 'react';

const ROOMS = [
  {
    id: 'summit',
    name: 'Summit',
    location: '4th Floor',
    zone: 'FOS 1',
    capacity: 12,
    amenities: ['Video conferencing', 'Whiteboard'],
  },
  {
    id: 'horizon',
    name: 'Horizon',
    location: '3rd Floor',
    zone: 'FOS 2',
    capacity: 8,
    amenities: ['Video conferencing'],
  },
  {
    id: 'atrium',
    name: 'Atrium',
    location: 'Ground Floor',
    zone: 'Show Room',
    capacity: 20,
    amenities: ['Projector', 'Video conferencing'],
  },
  {
    id: 'nook',
    name: 'Nook',
    location: '2nd Floor',
    zone: 'FD 1',
    capacity: 4,
    amenities: ['Phone booth'],
  },
  {
    id: 'beacon',
    name: 'Beacon',
    location: '3rd Floor',
    zone: 'FD 2',
    capacity: 10,
    amenities: ['Video conferencing', 'Whiteboard'],
  },
];

const STORAGE_KEY = 'room-booking-app-bookings';

const addDays = (dateString, offset) => {
  const date = new Date(dateString);
  date.setDate(date.getDate() + offset);
  return date.toISOString().slice(0, 10);
};

const today = new Date();
const formatDateForInput = (date) => date.toISOString().slice(0, 10);
const getInitialDate = (offset = 0) => {
  const next = new Date(today);
  next.setDate(next.getDate() + offset);
  return formatDateForInput(next);
};

const getDefaultBookings = () => [
  { id: 'b-1', roomId: 'summit', date: getInitialDate(1), time: '09:00', attendees: 8, title: 'Leadership sync' },
  { id: 'b-2', roomId: 'atrium', date: getInitialDate(0), time: '14:00', attendees: 12, title: 'Marketing planning' },
  { id: 'b-3', roomId: 'beacon', date: getInitialDate(2), time: '11:30', attendees: 6, title: 'Product review' },
  { id: 'b-4', roomId: 'nook', date: getInitialDate(0), time: '15:00', attendees: 3, title: '1:1 check-in' },
];

const getRoomById = (roomId) => ROOMS.find((room) => room.id === roomId);

function App() {
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : getDefaultBookings();
  });
  const [query, setQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(getInitialDate(0));
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [minCapacity, setMinCapacity] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }, [bookings]);

  const filteredRooms = useMemo(() => {
    return ROOMS.filter((room) => {
      const matchesQuery =
        room.name.toLowerCase().includes(query.toLowerCase()) ||
        room.location.toLowerCase().includes(query.toLowerCase()) ||
        room.zone.toLowerCase().includes(query.toLowerCase());

      const matchesCapacity = room.capacity >= minCapacity;
      const hasBooking = bookings.some(
        (booking) => booking.roomId === room.id && booking.date === selectedDate
      );

      return matchesQuery && matchesCapacity && (!onlyAvailable || !hasBooking);
    });
  }, [bookings, minCapacity, onlyAvailable, query, selectedDate]);

  const upcomingBookings = useMemo(() => {
    return [...bookings]
      .sort((a, b) => new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time))
      .slice(0, 5);
  }, [bookings]);

  const stats = useMemo(() => {
    const bookingsToday = bookings.filter((booking) => booking.date === selectedDate).length;
    const totalSeats = ROOMS.reduce((sum, room) => sum + room.capacity, 0);

    return {
      totalRooms: ROOMS.length,
      bookedToday: bookingsToday,
      seats: totalSeats,
    };
  }, [bookings, selectedDate]);

  const handleBookingSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const roomId = selectedRoom.id;
    const nextBooking = {
      id: `b-${Date.now()}`,
      roomId,
      date: formData.get('date'),
      time: formData.get('time'),
      attendees: Number(formData.get('attendees')),
      title: formData.get('title') || 'Booked meeting',
    };

    setBookings((current) => [...current, nextBooking]);
    setSelectedRoom(null);
  };

  const handleDeleteBooking = (bookingId) => {
    setBookings((current) => current.filter((booking) => booking.id !== bookingId));
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">Workspace</p>
          <h1>Room booking</h1>
        </div>

        <label className="field">
          <span>Search</span>
          <input
            type="text"
            placeholder="Search room, floor, zone"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <label className="field">
          <span>Minimum capacity</span>
          <input
            type="range"
            min="0"
            max="20"
            step="2"
            value={minCapacity}
            onChange={(event) => setMinCapacity(Number(event.target.value))}
          />
          <strong>{minCapacity}+ seats</strong>
        </label>

        <label className="field check-row">
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={(event) => setOnlyAvailable(event.target.checked)}
          />
          <span>Only available rooms</span>
        </label>

        <label className="field">
          <span>Booking date</span>
          <input
            type="date"
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
          />
        </label>

        <div className="stats-panel">
          <div>
            <span>Total rooms</span>
            <strong>{stats.totalRooms}</strong>
          </div>
          <div>
            <span>Booked</span>
            <strong>{stats.bookedToday}</strong>
          </div>
          <div>
            <span>Seats</span>
            <strong>{stats.seats}</strong>
          </div>
        </div>

        <div className="upcoming-box">
          <div className="section-title-row">
            <h3>Upcoming</h3>
          </div>
          <div className="upcoming-list">
            {upcomingBookings.map((booking) => {
              const room = getRoomById(booking.roomId);
              return (
                <div className="upcoming-item" key={booking.id}>
                  <div>
                    <strong>{booking.title}</strong>
                    <span>
                      {room?.name} • {booking.date}
                    </span>
                  </div>
                  <button type="button" onClick={() => handleDeleteBooking(booking.id)}>
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </aside>

      <main className="main-panel">
        <header className="panel-header">
          <div>
            <p className="eyebrow">Available spaces</p>
            <h2>{filteredRooms.length} rooms</h2>
          </div>
          <button
            type="button"
            className="primary-button"
            onClick={() => setSelectedRoom(ROOMS[0])}
          >
            Book now
          </button>
        </header>

        <div className="calendar-strip">
          {Array.from({ length: 7 }, (_, index) => {
            const date = addDays(getInitialDate(0), index);
            const isActive = selectedDate === date;

            return (
              <button
                type="button"
                key={date}
                className={`date-pill ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedDate(date)}
              >
                <span>{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                <strong>{new Date(date).getDate()}</strong>
              </button>
            );
          })}
        </div>

        <div className="room-grid">
          {filteredRooms.map((room) => {
            const roomBookings = bookings.filter(
              (booking) => booking.roomId === room.id && booking.date === selectedDate
            );
            const status = roomBookings.length > 0 ? 'Booked' : 'Available';

            return (
              <article key={room.id} className="room-card">
                <div className="room-topline">
                  <span className={`status ${status.toLowerCase()}`}>{status}</span>
                  <span className="capacity">{room.capacity} seats</span>
                </div>

                <h3>{room.name}</h3>
                <p className="location">{room.location}</p>
                <p className="zone">{room.zone}</p>

                <div className="amenities">
                  {room.amenities.map((amenity) => (
                    <span key={amenity} className="chip">
                      {amenity}
                    </span>
                  ))}
                </div>

                <div className="booking-list">
                  {roomBookings.length ? (
                    roomBookings.map((booking) => (
                      <div key={booking.id} className="mini-booking">
                        <span>{booking.time}</span>
                        <strong>{booking.title}</strong>
                      </div>
                    ))
                  ) : (
                    <div className="mini-booking empty">
                      <span>No bookings</span>
                    </div>
                  )}
                </div>

                <div className="room-footer">
                  <span>{roomBookings.length > 0 ? `${roomBookings.length} booking(s)` : 'Open schedule'}</span>
                  <button type="button" onClick={() => setSelectedRoom(room)}>
                    Book room
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </main>

      {selectedRoom && (
        <div className="modal-backdrop" onClick={() => setSelectedRoom(null)}>
          <div className="booking-modal" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <div>
                <p className="eyebrow">New reservation</p>
                <h3>{selectedRoom.name}</h3>
              </div>
              <button type="button" className="close-button" onClick={() => setSelectedRoom(null)}>
                ×
              </button>
            </div>

            <form onSubmit={handleBookingSubmit}>
              <div className="field-grid">
                <label className="field">
                  <span>Booking title</span>
                  <input type="text" name="title" defaultValue="Team meeting" required />
                </label>

                <label className="field">
                  <span>Date</span>
                  <input type="date" name="date" defaultValue={selectedDate} required />
                </label>

                <label className="field">
                  <span>Time</span>
                  <input type="time" name="time" defaultValue="09:00" required />
                </label>

                <label className="field">
                  <span>Attendees</span>
                  <input type="number" name="attendees" min="1" max={selectedRoom.capacity} defaultValue={4} required />
                </label>
              </div>

              <div className="modal-summary">
                <span>{selectedRoom.location}</span>
                <span>{selectedRoom.zone}</span>
                <span>{selectedRoom.amenities.join(' • ')}</span>
              </div>

              <div className="modal-actions">
                <button type="button" className="secondary-button" onClick={() => setSelectedRoom(null)}>
                  Cancel
                </button>
                <button type="submit" className="primary-button">
                  Confirm booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
