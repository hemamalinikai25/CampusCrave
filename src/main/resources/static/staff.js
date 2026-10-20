
const staffOrders = document.getElementById("staff-orders");

async function loadStaffOrders() {
    staffOrders.textContent = "Loading orders...";

    try {
        const response = await fetch("/api/orders");

        if (!response.ok) {
            throw new Error("Failed to load orders");
        }

        const orders = await response.json();
        staffOrders.innerHTML = "";

        if (orders.length === 0) {
            staffOrders.textContent = "No orders yet.";
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
            status.textContent = "Status: ";
            
            const badge = document.createElement("span");
            badge.className = "status-badge status-" +
            String(order.status).toLowerCase();
            badge.textContent = order.status;
            
            status.appendChild(badge);


            const select = document.createElement("select");

            ["PLACED", "PREPARING", "READY"].forEach(statusOption => {
                const option = document.createElement("option");
                option.value = statusOption;
                option.textContent = statusOption;

                if (statusOption === order.status) {
                    option.selected = true;
                }

                select.appendChild(option);
            });

            const button = document.createElement("button");
            button.textContent = "Update Status";

            button.addEventListener("click", async () => {
                try {
                    const updateResponse = await fetch(
                        `/api/orders/${order.id}/status`,
                        {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                status: select.value
                            })
                        }
                    );

                    if (!updateResponse.ok) {
                        throw new Error("Status update failed");
                    }

                    alert("Order #" + order.id + " updated!");
                    loadStaffOrders();

                } catch (error) {
                    alert("Could not update order status.");
                    console.error(error);
                }
            });

            card.append(title, food, price, status, select, button);
            staffOrders.appendChild(card);
        });

    } catch (error) {
        staffOrders.textContent = "Unable to load orders.";
        console.error(error);
    }
}

document.getElementById("refresh-orders")
    .addEventListener("click", loadStaffOrders);

loadStaffOrders();
