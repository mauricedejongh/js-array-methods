/* -Joe Walnes
* MIT License. See https://github.com/joewalnes/jstinytest/
*/

var TinyTestHelper = {
    renderStats: function(tests, failures) {
      var numberOfTests = Object.keys(tests).length;
      var successes = numberOfTests - failures;
      var div = document.createElement('div');

      var parHead = document.createElement('p');
      var parSuccess = document.createElement('p');
      var parFailure = document.createElement('p');

      parHead.textContent = 'Ran ' + numberOfTests + ' tests: ';
      parSuccess.textContent = successes + ' successes ';
      parFailure.textContent = failures +' failures';

      div.appendChild(parHead);
      div.appendChild(parSuccess);
      div.appendChild(parFailure);

      document.body.appendChild(div);
    }
}

var TinyTest = {
    run: function(tests) {
        var failures = 0;

        for (var testName in tests) {
            var testAction = tests[testName];
            try {
                testAction.apply(this);
                console.log('%c' + testName, 'color: green;');
            } catch (e) {
                failures++;
                console.groupCollapsed('%c' + testName, 'color: red;');
                console.error(e.stack);
                console.groupEnd();
            }
        }

        setTimeout(function() { // Give document a chance to complete
            if (window.document && document.body) {
                document.body.style.backgroundColor = (failures == 0 ? '#99ff99' : '#ff9999');
                TinyTestHelper.renderStats(tests, failures);
            }
        }, 0);

    },

    fail: function(msg) {
        throw new Error('fail(): ' + msg);
    },

    assert: function(value, msg) {
        if (!value) {
            throw new Error('assert(): ' + msg);
        }
    },

    assertEquals: function(expected, actual) {
        if (expected != actual) {
            throw new Error('assertEquals() "' + expected + '" != "' + actual + '"');
        }
    },

    assertStrictEquals: function(expected, actual) {
        if (expected !== actual) {
            throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');
        }
    },
};

var fail               = TinyTest.fail.bind(TinyTest),
    assert             = TinyTest.assert.bind(TinyTest),
    assertEquals       = TinyTest.assertEquals.bind(TinyTest),
    eq                 = TinyTest.assertEquals.bind(TinyTest), // alias for assertEquals
    assertStrictEquals = TinyTest.assertStrictEquals.bind(TinyTest),
    tests              = TinyTest.run.bind(TinyTest);
