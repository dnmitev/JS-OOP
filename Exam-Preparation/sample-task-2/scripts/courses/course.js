define(['courses/student'], function (Student) {
    "use strict";

    var Course;

    Course = (function () {

        function calculateTotalScoreFor(student) {
            var result;

            result = this._formula(student);

            return result;
        }

        function getTopStudentsSortedBy(sortBy, count) {
            var totalScores;

            if (!this._totalScores || this._totalScores.length !== this._students.length) {
                // be sure that all students in the course have calculated results
                this.calculateResults();
            }

            count = count || this._students.length;
            totalScores = this._totalScores.slice(0);
            totalScores.sort(sortBy);

            return totalScores.map(function (student) {
                var returnedStudent = Object.create(student.student);
                returnedStudent.totalScore = student.totalScore;
                return returnedStudent;
            }).slice(0, count);
        }

        function sortByExam(firstStudent, secondStudent) {
            return secondStudent.student.exam - firstStudent.student.exam;
        }

        function sortByScore(firstStudent, secondStudent) {
            return secondStudent.totalScore - firstStudent.totalScore;
        }


        function Course(name, formula) {
            this._name = name;
            this._formula = formula;
            this._students = [];
        }

        Course.prototype = {
            addStudent: function (student) {
                if (!(student instanceof Student)) {
                    throw {
                        message: "You can add only students to the course"
                    };
                }

                this._students.push(student);
                return this;
            },
            calculateResults: function () {
                var i,
                    len,
                    studentTotalScore,
                    student;

                this._totalScores = [];

                for (i = 0, len = this._students.length; i < len; i += 1) {
                    student = this._students[i];
                    studentTotalScore = calculateTotalScoreFor.call(this, student);

                    this._totalScores.push({
                        student: student,
                        totalScore: studentTotalScore
                    });
                }

                return this;
            },
            getTopStudentsByExam: function (count) {
                return getTopStudentsSortedBy.call(this, sortByExam, count);
            },
            getTopStudentsByTotalScore: function (count) {
                return getTopStudentsSortedBy.call(this, sortByScore, count);
            }
        }

        return Course;
    }());

    return Course;
});