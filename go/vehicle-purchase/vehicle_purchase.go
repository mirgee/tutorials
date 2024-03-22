package purchase

// NeedsLicense determines whether a license is needed to drive a type of vehicle. Only "car" and "truck" require a license.
func NeedsLicense(kind string) bool {
  if kind == "car" || kind == "truck" {
    return true
  } else {
    return false
  }
}

// ChooseVehicle recommends a vehicle for selection. It always recommends the vehicle that comes first in lexicographical order.
func ChooseVehicle(option1, option2 string) string {
  var res string
	if option1 <= option2 {
    res = option1
  } else {
    res = option2
  }
  return res + " is clearly the better choice."
}

// CalculateResellPrice calculates how much a vehicle can resell for at a certain age.
func CalculateResellPrice(originalPrice, age float64) float64 {
	if age >= 10 {
    return 0.5 * originalPrice
  } else if age >= 3 {
    return 0.7 * originalPrice
  } else {
    return 0.8 * originalPrice
  }
}
