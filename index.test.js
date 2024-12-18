const { Room, Booking } = require('./index');

// Tests for Rooms (isOccupied)
describe('ROOMS - Check occupancy rooms in a date', () => {

    test('Room date invalid parameter - throws error', () => {
        const booking1 = new Booking("Booking1", "admin@admin.com", new Date("07/16/2024"), new Date("07/18/2024"), 30, {});
        const booking2 = new Booking("Booking2", "admin@admin.com", new Date("07/18/2024"), new Date("07/20/2024"), 30, {});
        const room1 = new Room("Room1", [booking1, booking2], 1000, 10);
        const checkDate = "07/23/2024";  // esto es un string no una fecha.

        expect(() => room1.isOccupied(checkDate)).toThrowError("Invalid parameter: date expected");
    })

    test('Returned value expected to be boolean', () => {
        const booking1 = new Booking("Booking1", "admin@admin.com", new Date("07/20/2024"), new Date("07/22/2024"), 30, {});
        const booking2 = new Booking("Booking2", "admin@admin.com", new Date("07/22/2024"), new Date("07/24/2024"), 30, {});
        const room1 = new Room("Room1", [booking1, booking2], 1000, 10);
        const checkDate = new Date("07/21/2024");
    
        expect(typeof(room1.isOccupied(checkDate))).toBe("boolean");
    })

})


// Tests for Rooms (occupancyPercentage)
describe('ROOMS - Percentage of days with occupancy', () => {

    test('Invalid parameters (date startDate) - throws error', () => {
        const booking1 = new Booking("Booking1", "admin@admin.com", new Date("07/16/2024"), new Date("07/18/2024"), 30, {});
        const booking2 = new Booking("Booking2", "admin@admin.com", new Date("07/18/2024"), new Date("07/20/2024"), 30, {});
        const room1 = new Room("Room1", [booking1, booking2], 1000, 10);
        const startDate = "07/16/2024";  // esto es un string, no una fecha
        const endDate = new Date("07/20/2024");
    
        expect(() => room1.occupancyPercentage(startDate, endDate)).toThrowError("Invalid parameter: startDate and endDate expected to be dates");
    })

    test('Invalid parameters (date endDate) - throws error', () => {
        const booking1 = new Booking("Booking1", "admin@admin.com", new Date("07/16/2024"), new Date("07/18/2024"), 30, {});
        const booking2 = new Booking("Booking2", "admin@admin.com", new Date("07/18/2024"), new Date("07/20/2024"), 30, {});
        const room1 = new Room("Room1", [booking1, booking2], 1000, 10);
        const startDate = new Date("07/15/2024");
        const endDate = "07/23/2024"; // this is a string, not a date
    
        expect(() => room1.occupancyPercentage(startDate, endDate)).toThrowError("Invalid parameter: startDate and endDate expected to be dates");
    })

    test('Returned value expected to be a number >= 0 && <= 100', () => {
        const booking1 = new Booking("Booking1", "admin@admin.com", new Date("07/16/2024"), new Date("07/18/2024"), 30, {});
        const booking2 = new Booking("Booking2", "admin@admin.com", new Date("07/20/2024"), new Date("07/22/2024"), 30, {});
        const room1 = new Room("Room1", [booking1, booking2], 1000, 10);
        const startDate = new Date("07/15/2024");
        const endDate = new Date("07/23/2024");
    
        expect(typeof(room1.occupancyPercentage(startDate, endDate))).toBe('number');
    
        expect(room1.occupancyPercentage(startDate, endDate)).toBeGreaterThanOrEqual(0);
        expect(room1.occupancyPercentage(startDate, endDate)).toBeLessThanOrEqual(100);
    })

    test('0% occupancy for this room', () => {
        const booking1 = new Booking("Booking1", "admin@admin.com", new Date("07/16/2024"), new Date("07/18/2024"), 30, {});
        const booking2 = new Booking("Booking2", "admin@admin.com", new Date("07/18/2024"), new Date("07/20/2024"), 30, {});
        const room1 = new Room("Room1", [booking1, booking2], 1000, 10);
        const startDate = new Date("07/23/2024");
        const endDate = new Date('07/30/2024');

        expect(room1.occupancyPercentage(startDate, endDate)).toBe(0);
    })

    test('50% occupancy for this room', () => {
        const booking1 = new Booking("Booking1", "admin@admin.com", new Date("07/16/2024"), new Date("07/18/2024"), 30, {});
        const booking2 = new Booking("Booking2", "admin@admin.com", new Date("07/18/2024"), new Date("07/22/2024"), 30, {});
        const room1 = new Room("Room1", [booking1, booking2], 1000, 10);
        const startDate = new Date("07/16/2024");
        const endDate = new Date('07/29/2024');

        expect(room1.occupancyPercentage(startDate, endDate)).toBe(50);
    })

    test('100% occupancy for this room', () => {
        const booking1 = new Booking("Booking1", "admin@admin.com", new Date("07/16/2024"), new Date("07/18/2024"), 30, {});
        const booking2 = new Booking("Booking2", "admin@admin.com", new Date("07/18/2024"), new Date("07/22/2024"), 30, {});
        const room1 = new Room("Room1", [booking1, booking2], 1000, 10);
        const startDate = new Date("07/16/2024");
        const endDate = new Date('07/22/2024');

        expect(room1.occupancyPercentage(startDate, endDate)).toBe(100);
    })
    
})


// Tests for Rooms (totalOccupancyPercentage)
describe('ROOMS - Total occupancy percentage across all rooms', () => {

    test('Invalid parameters (array room) - throws error', () => {
        const booking1 = new Booking("Booking1", "admin@admin.com", new Date("07/16/2024"), new Date("07/18/2024"), 30, {});
        const booking2 = new Booking("Booking2", "admin@admin.com", new Date("07/18/2024"), new Date("07/20/2024"), 30, {});
        const room1 = new Room("Room1", [booking1, booking2], 1000, 10);
        const rooms = room1;  // this is not an array
        const startDate = new Date("07/16/2024");
        const endDate = new Date("07/20/2024");
    
        expect(() => Room.totalOccupancyPercentage(rooms, startDate, endDate)).toThrowError("Invalid parameter: rooms expected to be an array");
    })

    test('Invalid parameters (date startDate) - throws error', () => {
        const booking1 = new Booking("Booking1", "admin@admin.com", new Date("07/16/2024"), new Date("07/18/2024"), 30, {});
        const booking2 = new Booking("Booking2", "admin@admin.com", new Date("07/18/2024"), new Date("07/20/2024"), 30, {});
        const room1 = new Room("Room1", [booking1, booking2], 1000, 10);
        const rooms = [room1];
        const startDate = "07/16/2024";  // this is a string, not a date
        const endDate = new Date("07/20/2024");
    
        expect(() => Room.totalOccupancyPercentage(rooms, startDate, endDate)).toThrowError("Invalid parameter: startDate and endDate expected to be dates");
    })
    
    
})


// Tests bookings
//describe('BOOKINGS - Total price', () => {

   