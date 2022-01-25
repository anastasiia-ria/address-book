// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, address) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.address = address;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

function Address(work, personal, emails) {
  this.work = work;
  this.personal = personal;
  this.emails = emails;
}

function Email(work, personal, other) {
  this.work = work;
  this.personal = personal;
  this.other = other;
}

// User Interface Logic ---------
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    $('.hidden').hide();
    showContact(this.id);
  });

  $('.address').click(function(){
    showAddress(this.id);
  });

  $('.email').click(function(){
    showEmail(this.id);
  });

  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
}

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".address").attr('id', contactId);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}

function showAddress(contactId) {
  const contact = addressBook.findContact(contactId)
  $("#show-address").toggle();
  $(".address-work").html(contact.address.work);
  $(".address-personal").html(contact.address.personal);
  $(".email").attr('id', contactId);
}

function showEmail(contactId) {
  const contact = addressBook.findContact(contactId)
  $("#show-email").toggle();
  $(".email-work").html(contact.address.emails.work);
  $(".email-personal").html(contact.address.emails.personal);
  $(".email-other").html(contact.address.emails.other);
}

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedAddressPersonal = $("input#new-address-personal").val();
    const inputtedAddressWork = $("input#new-address-work").val();
    const inputtedEmailWork = $("input#new-email-work").val();
    const inputtedEmailPersonal = $("input#new-email-personal").val();
    const inputtedEmailOther = $("input#new-email-other").val();

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-address-personal").val("");
    $("input#new-address-work").val("");
    $("input#new-email-personal").val("");
    $("input#new-email-work").val("");
    $("input#new-email-other").val("");

    let email = new Email(inputtedEmailWork, inputtedEmailPersonal, inputtedEmailOther);
    let address = new Address (inputtedAddressPersonal, inputtedAddressWork, email);
    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, address);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});