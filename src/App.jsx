/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1, name: 'Jack', phone: 88885555, age: 25, gender: 'M',
    bookingTime: new Date().toLocaleString(), bookingSeat: 1,
  },
  {
    id: 2, name: 'Rose', phone: 88884444, age: 26, gender: 'F',
    bookingTime: new Date().toLocaleString(), bookingSeat: 10,
  },
];


function TravellerRow(props) {
  {/*Q3. Placeholder to initialize local variable based on traveller prop.*/}
  const { traveller } = props;
  return (
    <tr>
	  {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
    <td>{traveller.id}</td>
    <td>{traveller.name}</td>
    <td>{traveller.phone}</td>
    <td>{traveller.age}</td>
    <td>{traveller.gender}</td>
    <td>{traveller.bookingTime}</td>
    <td>{traveller.bookingSeat}</td>
    </tr>
  );
}

function Display(props) {
  
	/*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/
  const { travellers } = props;
  return (
    <table className="bordered-table">
      <thead>
        <tr>
	  {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Booking Time</th>
          <th>Booking Seat</th>
        </tr>
      </thead>
      <tbody>
        {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
        {travellers && travellers.map((traveller) => (
          <TravellerRow key={traveller.id} traveller={traveller} />
        ))}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    this.props.bookTraveller({
      name: e.target.elements.travellername.value,
      phone: e.target.elements.travellerphone.value,
      age: e.target.elements.travellerage.value,
      gender: e.target.elements.travellergender.value,
      bookingTime: new Date().toLocaleString(),
      bookingSeat: e.target.elements.travellerbookingseat.value,
    });
    e.target.elements.travellername.value = '';
    e.target.elements.travellerphone.value = '';
    e.target.elements.travellerage.value = '';
    e.target.elements.travellergender.value = '';
    e.target.elements.travellerbookingseat.value = '';
  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
	    {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        <input type="text" name="travellername" placeholder="Name" required/>
        <input type="text" name="travellerphone" placeholder="Phone" required/>
        <input type="text" name="travellerage" placeholder="Age" required/>
        <label>Gender: </label>
        {/* <select name="travellerGender" required>
          <option key="M" value="M">M</option>
          <option key="F" value="F">F</option>
        </select> */}
        <input type="text" name="travellergender" placeholder="M/F" required/>
        <input type="text" name="travellerbookingseat" placeholder="1" required/>
        <button>Add</button>
      </form>
    );
  }
}


class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
    this.props.deleteTraveller({
      name: e.target.elements.travellername.value,
    });
    e.target.elements.travellername.value = '';
  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
      {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
        <input type="text" name="travellername" placeholder="Name" />
        <button>Delete</button>
      </form>
    );
  }
}

class Homepage extends React.Component {
	constructor() {
	super();
	}
	render(){
	return (
	<div>
		{/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
    {this.props.seats.map((ride, rideIndex) => {
        const count = ride.seats.filter((seat) => seat === 'unreserved').length;

        return (
          <div key={rideIndex}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {ride.seats.map((row, rowIndex) => (
                <div
                key={rowIndex}
                style={{
                  width: '40px',
                  height: '40px',
                  margin: '5px',
                  backgroundColor: row === 'unreserved' ? 'green' : 'grey',
                  border: '1px solid black',
                  display: 'flex',
                }}
              >
              </div>
              ))}
            </div>
            <h4>Unreserved Seats: {count} / 10</h4>
            <hr /><br></br>
          </div>
        );
        })}
    </div>
  );
}
}


class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], selector: 1};
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
    this.emptySeats = [
      {
        rideNumber: 1,
        seats: ['unreserved', 'unreserved', 'unreserved', 'unreserved', 'unreserved', 'unreserved', 'unreserved', 'unreserved', 'unreserved', 'unreserved'],
      }
    ];
    this.state = { seats: this.emptySeats };
  }

  setSelector(value)
  {
  	/*Q2. Function to set the value of component selector variable based on user's button click.*/
    if (value === 1) {
      this.setState({ selector: 1 });
    }
    if (value === 2) {
      this.setState({ selector: 2 });
    }
    if (value === 3) {
      this.setState({ selector: 3 });
    }
    if (value === 4) {
      this.setState({ selector: 4 });
    }
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
    initialTravellers.forEach((traveller) => {
      this.updateSeats(traveller, 'add');
    });
  }

  bookTraveller(passenger) {
	    /*Q4. Write code to add a passenger to the traveller state variable.*/
      if (passenger.bookingSeat < 1 || passenger.bookingSeat > 10) {
        alert('Invalid seat number');
        return;
      }
      if (this.state.seats[0].seats[passenger.bookingSeat - 1] === 'reserved') {
        alert('Seat already reserved');
        return;
      }
      const newTravellers = this.state.travellers.slice();
      newTravellers.push({
        id: newTravellers.length + 1,
        name: passenger.name,
        phone: passenger.phone,
        age: passenger.age,
        gender: passenger.gender,
        bookingTime: passenger.bookingTime,
        bookingSeat: passenger.bookingSeat,
      });
      this.setState({ travellers: newTravellers });
      this.updateSeats(passenger, 'add');
  }

  deleteTraveller(passenger) {
	  /*Q5. Write code to delete a passenger from the traveller state variable.*/
    const newTravellers = this.state.travellers.slice();
    for (let i = 0; i < newTravellers.length; i++) {
      if (newTravellers[i].name === passenger.name) {
        newTravellers.splice(i, 1);
        passenger.bookingSeat = this.state.travellers[i].bookingSeat;
        this.setState({ travellers: newTravellers });
        this.updateSeats(passenger, 'delete');
        break;
      }
    }
  }

  updateSeats(passenger, type) {
    const curSeat = passenger.bookingSeat;
    const col = curSeat - 1;
    const newSeats = this.state.seats;
    newSeats[0].seats[col] = type === 'add' ? 'reserved' : 'unreserved';
    this.setState({ seats: newSeats });
  }

  render() {
    return (
      <div>
        <h1>Ticket To Ride</h1>
	<div>
	    {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
      <nav>
        <button onClick={() => this.setSelector(1)}>Homepage</button>
        <button onClick={() => this.setSelector(2)}>Display</button>
        <button onClick={() => this.setSelector(3)}>Add</button>
        <button onClick={() => this.setSelector(4)}>Delete</button>
      </nav>
	</div>
	<div>
		{/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
		{/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
		{/*Q3. Code to call component that Displays Travellers.*/}
    {this.state.selector === 1 && <Homepage seats={this.state.seats}/>}
		{this.state.selector === 2 && <Display travellers={this.state.travellers} />}
    {this.state.selector === 3 && <Add bookTraveller={this.bookTraveller} />}
    {this.state.selector === 4 && <Delete deleteTraveller={this.deleteTraveller} />}
		{/*Q4. Code to call the component that adds a traveller.*/}
		{/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
	</div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
