import './ListPeople.css';

const renderedList = (contacts) => {
	if (contacts.length === 0) {
		return (
			<tr>
				<td>No contacts available</td>
			</tr>
		);
	}

	return contacts.map((contact, index) => (
		<tr key={contact.name}>
			<td>{index + 1}</td>
			<td>{contact.name}</td>
			<td>{contact.number}</td>
			<td>{contact.email}</td>
		</tr>
	));
};

export default function ListPeople({ contacts }) {
	return (
		<div className='card w-40 mx-10 px-30 py-30'>
			<h3 className='pt-10'>Contact List</h3>
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Phone Number</th>
						<th>Email</th>
					</tr>
				</thead>
				<tbody data-testid='list-people'>{renderedList(contacts)}</tbody>
			</table>
		</div>
	);
}
