export default function recommend(maxPrice, maxDistance, languages, cuisines, restrictions) {
  // restaurant(‘Jacoby Burger’, 11, 4, [english], [burgers, salads, beer], []]).
  // restaurant(‘Hoya Sushi’, 9, 1, [japanese, korean, english], [japanese], []).
  // restaurant(‘Jamba Juice’, 3, 0, [korean, english], [‘juices/smoothies’], []).
  // swipl.initialize();
  // let recommender = swipl.module('recommender');
  //
  // recommender.assert("restaurant('Jacoby Burger', 11, 4, [english], [burgers, salads, beer], []]).");
  // let recommendation = recommender.call_predicate('restaurant', ['Jacoby Burger', 'X', 'Y', 'Z', 'A', 'B']);

  return (
    `I want to pay ${maxPrice} for ${cuisines} and ${restrictions} food which is up to ${maxDistance} away with menus in ${languages}.`
    // recommendation
  );
}
