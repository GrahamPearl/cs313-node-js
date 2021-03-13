class Postmail extends Object {
  static urlResponse = "pages/postmail_report";

  static closest(arr, closestTo) {
    let closest = Math.max.apply(null, arr);

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] >= closestTo && arr[i] < closest) closest = arr[i];
    }

    return closest; // return the value
  };

  static calculateRate(mail_type, weight, zone) {
    let cost = 200;
    let weights = [];
    let amount = [];
    let index = 0;
    switch (mail_type) {
      case "1":
        weights = [1, 2, 3, 3.5];
        index = [Postmail.closest(weights, weight)];

        amount = [0.55, 0.75, 0.95, 1.15];
        cost = amount[index - 1];
        break;

      case "2":
        weights = [1, 2, 3, 3.5];
        index = [Postmail.closest(weights, weight)];

        amount = [0.51, 0.71, 0.91, 1.11];
        cost = amount[index - 1];
        break;

      case "3":
        weights = [1, 2, 3, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        index = [Postmail.closest(weights, weight)];

        amount = [1.00, 1.20, 1.40, 1.60, 1.80, 2.00, 2.20, 2.40, 2.60, 2.80, 3.00, 3.20, 3.40];
        cost = amount[index - 1];
        break;

      case "4":
        weights = [1, 2, 3, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        index = [Postmail.closest(weights, weight)];
        amount = [
          [4.00, 4.00, 4.00, 4.00, 4.80, 4.80, 4.80, 4.80, 5.50, 5.50, 5.50, 5.50, 6.25],
          [4.00, 4.00, 4.00, 4.00, 4.80, 4.80, 4.80, 4.80, 5.50, 5.50, 5.50, 5.50, 6.25],
          [4.10, 4.10, 4.10, 4.10, 4.85, 4.85, 4.85, 4.85, 5.55, 5.55, 5.55, 5.55, 6.30],
          [4.15, 4.15, 4.15, 4.15, 4.90, 4.90, 4.90, 4.90, 5.60, 5.60, 5.60, 5.60, 6.40],
          [4.20, 4.20, 4.20, 4.20, 4.95, 4.95, 4.95, 4.95, 5.65, 5.65, 5.65, 5.65, 6.50],
          [4.25, 4.25, 4.25, 4.25, 5.00, 5.00, 5.00, 5.00, 5.70, 5.70, 5.70, 5.70, 6.55],
          [4.30, 4.30, 4.30, 4.30, 5.10, 5.10, 5.10, 5.10, 5.85, 5.85, 5.85, 5.85, 6.65],
          [4.45, 4.45, 4.45, 4.45, 5.20, 5.20, 5.20, 5.20, 5.95, 5.95, 5.95, 5.95, 6.75],
          [4.45, 4.45, 4.45, 4.45, 5.20, 5.20, 5.20, 5.20, 5.95, 5.95, 5.95, 5.95, 6.75]
        ];
        cost = amount[zone][index - 1];
        break;
      default:
        cost = 50;
    }
    return cost;
  };

  setURL() {
    
  }

  execute(req, res) {
    try {
      var amountOwed = Postmail.calculateRate(req.body.type, req.body.weight, req.body.zone);
      var params = {
        amount: amountOwed
      };
      res.render(Postmail.urlResponse, params);
    } catch (err) {
      console.log('Error - will need to resolve:', err);
      //res.render("pages/error-report");
    }
  };
}

module.exports = Postmail