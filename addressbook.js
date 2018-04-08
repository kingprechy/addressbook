
//Instantiate localstorage

if (typeof(Storage) !== "undefined") {
    if(!localStorage.getItem('contacts')) {
		var contacts = new Array();
    	localStorage.setItem('contacts', JSON.stringify(contacts));
    }
} else {
	alert('This browser does not support Localstorage API.');
}


var showForm = document.getElementById('showForm');
var contactForm = document.getElementById('form-area');
var messageArea = document.getElementById('msg-area');
var addressBook = document.getElementById('address-book');


var btn = document.getElementById('contacts-op-save');
var address_list = document.getElementById('address-list');
//var edit_contact = document.querySelector('.edit');
var edit_contact = document.getElementById('address-list');
var edit_form = document.getElementById('edit-form');

var contacts_list = JSON.parse(localStorage.getItem('contacts'));


//Display "Add new contact" form
showForm.addEventListener('click', function(e) {
	addressBook.style.display = 'none';
	contactForm.style.display = 'inherit';
	e.preventDefault();
});






//Store contacts to local storage after validation
btn.addEventListener('click', function(e) {


	edit_form.style.display = 'none';
	e.preventDefault();
	var name = document.getElementById('name').value;
	var phone = document.getElementById('phone').value;
	var email = document.getElementById('email').value;
	var address = document.getElementById('address').value;

	contacts_count = contacts_list.length;
	var new_contact = {
							'id': contacts_count + 1,
							'name': name,
							'email': email,
							'phone': phone,
							'address': address,
						}
						contacts_list.push(new_contact);

	//store data to localstorage
   	localStorage.setItem('contacts', JSON.stringify(contacts_list));

	//hide form and display success message
	contactForm.style.display = 'none';
	messageArea.style.display = 'inherit';
	messageArea.innerText = 'New Contact added succesfully!';



	return false;


});

//Display All contacts in local storage
var showContacts = document.getElementById('showContacts');
showContacts.addEventListener('click', function(e) {
	e.preventDefault();
	contactForm.style.display = 'none';
	edit_form.style.display = 'none';

	contacts = contacts_list;

	if(contacts.length > 0 )  {
		address_list.innerHTML = '';
		for (i = 0 ; i < contacts.length; i++) {
			address_list.innerHTML += "<tr id='row"+ contacts[i].id  +"'><td>"+ contacts[i].name +
										"</td><td>"+ contacts[i].phone +"</td> <td>"
										+ contacts[i].email +"</td> <td>"
										+ contacts[i].address +"</td><td>"+
										"<a href='#' class='edit' data-contact-action='edit"+ contacts[i].id +"' data-contact-id='"+ contacts[i].id +"'>Edit</a> | "+
										"<a href='#' class='delete' data-contact-action='delete"+ contacts[i].id +"' data-contact-id='"+ contacts[i].id +"'>Delete</a></td></tr>";
		}
	} else {
		address_list.innerHTML = "<tr><td colspan='5'>No contact added yet</td></tr>";		
	}
		addressBook.style.display = 'inline-table';



		var delete_contact = document.querySelectorAll('.delete');

						for(var x=0; x<delete_contact.length; x++)
						{

						  delete_contact[x].addEventListener("click", function(e) {
 									e.preventDefault();

									contact_id = this.getAttribute('data-contact-id');
									edit_form.style.display = 'none';
									
									this.parentNode.parentNode.style.display = 'none';

									old_contacts = contacts_list;
									
									//delete contact key in contacts localstorage array
								    old_contacts.splice(contact_id - 1 , 1);
								    console.log(contact_id - 1);

									new_contacts = JSON.stringify(old_contacts);
								   	localStorage.removeItem('contacts');
								   	localStorage.setItem('contacts', new_contacts);

									messageArea.style.display = 'inherit';
									messageArea.innerText = 'Contact Deleted succesfully!';

									return false;

						  });
						}


						var edit_contact = document.querySelectorAll('.edit');
						var edit_contact_fields = edit_form.querySelectorAll('form input[type="text"]');



										for(var x=0; x<edit_contact.length; x++)
										{

										  edit_contact[x].addEventListener("click", function(e) {
		 									e.preventDefault();

											edit_form.style.display = 'block';
											
											contact_id = this.getAttribute('data-contact-id');
											var this_contact = contacts_list[contact_id - 1];

											edit_form.querySelector('#name').value = this_contact.name;
											edit_form.querySelector('#phone').value = this_contact.phone;
											edit_form.querySelector('#email').value = this_contact.email;
											edit_form.querySelector('#address').value = this_contact.address;


												  document.getElementById('contacts-op-edit').addEventListener("click", function(e) {
													
													e.preventDefault();

														var name = edit_form.querySelector('#name').value;
														var phone = edit_form.querySelector('#phone').value;
														var email = edit_form.querySelector('#email').value;
														var address = edit_form.querySelector('#address').value;

														old_contacts = contacts_list;

														var contact_update = {
																				'id': contact_id,
																				'name': name,
																				'phone': phone,
																				'email': email,
																				'address': address,
																			}
														old_contacts[contact_id - 1] = contact_update;

//														console.log(document.getElementById('name').value);


														new_contacts = JSON.stringify(old_contacts);
													   	localStorage.removeItem('contacts');
													   	localStorage.setItem('contacts', new_contacts);

													   	
														document.querySelector("tr#row"+contact_id).innerHTML =  "<td>"+ name +
																					"</td><td>"+ phone +"</td> <td>"
																					+ email +"</td> <td>"
																					+ address +"</td><td>"+
																					"<a href='#' class='edit' data-contact-action='edit"+ contact_id +"' data-contact-id='"+ contact_id +"'>Edit</a> | "+
																					"<a href='#' class='delete' data-contact-action='delete"+ contact_id +"' data-contact-id='"+ contact_id +"'>Delete</a></td>";


	//													console.log(localStorage.contacts);
					

														edit_form.style.display = 'none';

														messageArea.style.display = 'inherit';
														messageArea.innerText = 'Contact Updated succesfully!';


														return false;
												  });


												return false;

										  });
								}


	return false;
});
