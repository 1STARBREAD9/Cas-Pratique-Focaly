document.addEventListener('DOMContentLoaded', function() {
    updateProductDetails(); // Update product details on page load
    initializeDatePickers(); // Initialize the date pickers
});

function updateProductDetails() {
    const productSelect = document.getElementById('productSelect'); // Get the product select element
    const selectedProduct = productSelect.value; // Get the selected product value

    const productDetails = {
        hero11: {
            image: '/images/hero11.png',
            sku: 'SKU: HERO-11',
            name: 'Hero11',
            price: 5, // Price in euros per day
            description: 'Hero11 is the latest in our line of action cameras, offering unparalleled performance and durability.'
        },
        hero12: {
            image: '/images/hero12.png',
            sku: 'SKU: HERO-12',
            name: 'Hero12',
            price: 10, // Price in euros per day
            description: 'Hero12 takes it to the next level with advanced features and superior image quality.'
        }
    };

    const product = productDetails[selectedProduct]; // Get the details of the selected product

    document.getElementById('productImage').src = product.image;
    document.getElementById('productSKU').textContent = product.sku;
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productPrice').textContent = product.price + '€ par jour';
    document.getElementById('productDescription').textContent = product.description;

    const startDate = document.getElementById('startDateInput').value; // Get the start date value
    const endDate = document.getElementById('endDateInput').value; // Get the end date value
    if (startDate && endDate) {
        updateTotalPrice(product.price, startDate, endDate); // Update the total price
    } else {
        document.getElementById('totalPrice').textContent = '0€'; // Set total price to 0 if no dates are selected
    }
}

function initializeDatePickers() {
    const startDateInput = document.getElementById('startDateInput'); // Get the start date input element
    const endDateInput = document.getElementById('endDateInput'); // Get the end date input element

    $(startDateInput).daterangepicker({
        singleDatePicker: true, // Enable single date picker
        locale: {
            format: 'YYYY-MM-DD' // Set the date format
        }
    });

    $(endDateInput).daterangepicker({
        singleDatePicker: true, // Enable single date picker
        locale: {
            format: 'YYYY-MM-DD' // Set the date format
        },

        isInvalidDate: function(date) {
            const startDate = $(startDateInput).data('daterangepicker').startDate;
            return date.diff(startDate, 'days') < 4; // Disable dates less than 4 days from the start date
        
        }
    });

      


    $(startDateInput).on('apply.daterangepicker', function(ev, picker) {
        const productSelect = document.getElementById('productSelect'); // Get the product select element
        const selectedProduct = productSelect.value; // Get the selected product value
        const productDetails = {
            hero11: { price: 5 },
            hero12: { price: 10 }
        };
        const product = productDetails[selectedProduct]; // Get the details of the selected product

        const startDate = picker.startDate.format('YYYY-MM-DD'); // Get the selected start date
        const endDate = document.getElementById('endDateInput').value; // Get the end date value
        if (endDate) {
            updateTotalPrice(product.price, startDate, endDate); // Update the total price
        }

          // Show the min rental duration message
          minRentalDurationMessage.style.display = 'block';

         
      });

   

    $(endDateInput).on('apply.daterangepicker', function(ev, picker) {
        const productSelect = document.getElementById('productSelect'); // Get the product select element
        const selectedProduct = productSelect.value; // Get the selected product value
        const productDetails = {
            hero11: { price: 5 },
            hero12: { price: 10 }
        };
        const product = productDetails[selectedProduct]; // Get the details of the selected product

        const endDate = picker.endDate.format('YYYY-MM-DD'); // Get the selected end date
        const startDate = document.getElementById('startDateInput').value; // Get the start date value
        if (startDate) {
            updateTotalPrice(product.price, startDate, endDate); // Update the total price
        }
    });

    $('#clearDatesButton').on('click', function() {
        $(startDateInput).val(''); // Clear the start date value
        $(endDateInput).val(''); // Clear the end date value
        document.getElementById('totalPrice').textContent = '0€'; // Set total price to 0
    });
}

function updateTotalPrice(pricePerDay, startDate, endDate) {
    if (!startDate || !endDate) { // Check if start or end date is missing
        document.getElementById('totalPrice').textContent = '0€'; // Set total price to 0 if dates are missing
        return;
    }

    const start = moment(startDate, 'YYYY-MM-DD'); // Parse the start date
    const end = moment(endDate, 'YYYY-MM-DD'); // Parse the end date
    const diffDays = end.diff(start, 'days', true); // Calculate the difference in days, including partial days

  

    const totalPrice = Math.ceil(diffDays) * pricePerDay; // Calculate the total price
    document.getElementById('totalPrice').textContent = totalPrice + '€'; // Update the total price in the DOM
}