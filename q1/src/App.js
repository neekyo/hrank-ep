import './App.css';
import 'h8k-components';
import AddPerson from './components/AddPerson/AddPerson';
import ListPeople from './components/ListPeople/ListPeople';
const title = 'Telephone Directory';

const App = () => {
	const [contacts, setContacts] = useState([]);

	// receive old array props, never mutate directly, before updating contacts!
	const addContact = (contact) => {
		setContacts([...contacts, contact]);
	};
	return (
		<div>
			<h8k-navbar header={title}></h8k-navbar>
			<div className='flex align-items-center justify-content-center container'>
				<AddPerson addContact={addContact} />
				<ListPeople contacts={contacts} />
			</div>
		</div>
	);
};

export default App;
