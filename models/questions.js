module.exports = function(sequelize, DataTypes) {
    var Questions = sequelize.define("Questions", {
        question_text: DataTypes.STRING,
        answer_key: DataTypes.BOOLEAN
    });
    return Questions.create({
        question_text: 'janedoe',
        answer_key: true,
      });;
}





