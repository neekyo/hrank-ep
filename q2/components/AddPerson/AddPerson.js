import { useState } from 'react';
import './AddPerson.css';

// interface Contact = {
// 	name: string,
// 	number: string,
// 	email: string,
// };

export default function AddPerson({ addContact }) {
	const [name, setName] = useState('');
	const [number, setNumber] = useState('');
	const [email, setEmail] = useState('');

	const handleAdd = (e) => {
		e.preventDefault();

		if (!name || !email || !number || number.length !== 10 || isNaN(number)) {
			alert('Enter Valid Data');
			return;
		}

		const contact = { name, number, email };
		addContact(contact);

		alert('Successfully Added');
		setName('');
		setNumber('');
		setEmail('');
	};

	return (
		<section>
			<div className='card pa-30 mr-30'>
				<form
					data-testid='add-person-form'
					onSubmit={handleAdd}
				>
					<div className='layout-column mb-15'>
						<label
							htmlFor='name'
							className='mb-3'
						>
							Person Name
						</label>
						<input
							type='text'
							placeholder='Enter Person Name'
							name='name'
							data-testid='person-name-input'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className='layout-column mb-15'>
						<label
							htmlFor='number'
							className='mb-3'
						>
							Phone Number
						</label>
						<input
							type='number'
							placeholder='Enter Phone Number'
							name='number'
							data-testid='phone-number-input'
							value={number}
							onChange={(e) => setNumber(e.target.value)}
						/>
					</div>
					<div className='layout-column mb-30'>
						<label
							htmlFor='email'
							className='mb-3'
						>
							Email
						</label>
						<input
							type='email'
							placeholder='Enter Email Address'
							name='email'
							data-testid='person-email-input'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className='layout-row justify-content-end'>
						<button
							type='submit'
							className='mx-0'
							data-testid='add-person-button'
						>
							Add Person
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}
