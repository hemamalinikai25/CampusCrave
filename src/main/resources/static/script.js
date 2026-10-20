
const menu = document.getElementById("food-menu");

async function loadFoodMenu() {
    try {
        const response = await fetch("/api/food");

        if (!response.ok) {
            throw new Error("Failed to load food menu");
        }

        const foods = await response.json();

        menu.innerHTML = "";

        if (foods.length === 0) {
            menu.textContent = "No food items available yet.";
            return;
        }

        foods.forEach(food => {
            const card = document.createElement("div");
            card.className = "food-card";

           
        card.innerHTML = `
        <h3>${food.name}</h3>
        <p>Price: ₹${food.price}</p>
        <p class="${food.available ? "" : "unavailable"}">
        ${food.available ? "Available" : "Currently unavailable"}
        </p>
        <button ${!food.available ? "disabled" : ""}>
            Order Now
        </button>
        `;

        const orderButton = card.querySelector("button");

        orderButton.addEventListener("click", async () => {
    try {
        const response = await fetch("/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                foodName: food.name,
                price: food.price
            })
        });

        if (!response.ok) {
            throw new Error("Order failed");
        }

        const order = await response.json();

        alert(
            "Order placed successfully! 🎉\n" +
            "Order ID: " + order.id
        );

    } catch (error) {
        alert("Could not place your order. Please try again.");
        console.error(error);
    }
});
            menu.appendChild(card);

        });
    } catch (error) {
        menu.textContent = "Unable to load menu. Please try again.";
        console.error(error);
    }
}

loadFoodMenu();


document.getElementById("view-orders").addEventListener("click", async () => {
    const ordersList = document.getElementById("orders-list");
    ordersList.textContent = "Loading orders...";

    try {
        const response = await fetch("/api/orders");

        if (!response.ok) {
            throw new Error("Failed to load orders");
        }

        const orders = await response.json();
        ordersList.innerHTML = "";

        if (orders.length === 0) {
            ordersList.textContent = "You haven't placed any orders yet.";
            return;
        }

        orders.forEach(order => {
            const card = document.createElement("div");
            card.className = "food-card";

            const title = document.createElement("h3");
            title.textContent = "Order #" + order.id;

            const food = document.createElement("p");
            food.textContent = "Food: " + order.foodName;

            const price = document.createElement("p");
            price.textContent = "Price: ₹" + order.price;

            const status = document.createElement("p");
            status.textContent = "Status: " + order.status;

            card.append(title, food, price, status);
            ordersList.appendChild(card);
        });
    } catch (error) {
        ordersList.textContent = "Unable to load orders. Please try again.";
        console.error(error);
    }
});


document.getElementById("track-order").addEventListener("click", async () => {
    const orderId = document.getElementById("tracking-id").value;
    const result = document.getElementById("tracking-result");

    if (!orderId || Number(orderId) < 1) {
        result.textContent = "Please enter a valid Order ID.";
        return;
    }

    result.textContent = "Checking your order...";

    try {
        const response = await fetch(`/api/orders/${orderId}`);

        if (response.status === 404) {
            result.textContent = "Order not found. Please check your ID.";
            return;
        }

        if (!response.ok) {
            throw new Error("Unable to track order");
        }

        const order = await response.json();

        
result.innerHTML = "";

const title = document.createElement("h3");
title.textContent = "Order #" + order.id;

const food = document.createElement("p");
food.textContent = "Food: " + order.foodName;

const status = document.createElement("p");
status.textContent = "Current Status: ";

const badge = document.createElement("span");
badge.className = "status-badge status-" +
    String(order.status).toLowerCase();
badge.textContent = order.status;
status.appendChild(badge);

const steps = ["PLACED", "PREPARING", "READY"];
const currentStep = steps.indexOf(order.status);

const progress = document.createElement("div");
progress.className = "order-progress";

steps.forEach((step, index) => {
    const item = document.createElement("div");
    item.className = "progress-step";

    const dot = document.createElement("div");
    dot.className = "progress-dot";

    if (index <= currentStep) {
        dot.classList.add("completed");
    }

    const label = document.createElement("span");
    label.textContent = step;

    item.append(dot, label);
    progress.appendChild(item);
});

const message = document.createElement("p");

if (order.status === "PLACED") {
    message.textContent = "Your order has been received!";
} else if (order.status === "PREPARING") {
    message.textContent = "Your food is being prepared!";
} else if (order.status === "READY") {
    message.textContent = "Your order is ready for collection!";
} else {
    message.textContent = "Please check with the canteen for updates.";
}

result.append(title, food, status, progress, message);


    } catch (error) {
        result.textContent = "Unable to track your order. Please try again.";
        console.error(error);
    }
});

