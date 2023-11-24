DELIMITER //

CREATE PROCEDURE getOrderHistory(IN cust_id_param INT)
BEGIN
    -- Updated logic here
    SELECT
        oh.order_id,
        oh.order_date,
        i.item_id,
        i.item_name,
        i.price
    FROM
        order_history AS oh
    JOIN inventory AS i ON oh.item_id = i.item_id
    WHERE
        oh.cust_id = cust_id_param;
END //

DELIMITER ;

