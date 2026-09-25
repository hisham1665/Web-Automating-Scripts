(async () => {
    const tasks = [
        "Integrated additional FastAPI backend APIs with the Flutter application and mapped the API responses to the required application models.",
        "Implemented Flutter data models for handling structured responses received from the FastAPI backend.",
        "Improved asynchronous API calls and loading-state handling across the application.",
        "Added error handling for network failures, invalid API responses, and server-side errors.",
        "Tested the API integration with different input conditions and backend responses and fixed integration issues."
    ];

    const rows = [...document.querySelectorAll(".iw-table tbody tr")];

    if (rows.length !== 5) {
        alert(`Expected 5 weekday rows, but found ${rows.length}. Found: ${rows.length}`);
        return;
    }

    // --------------------------------------------------
    // Set React-controlled input values
    // --------------------------------------------------

    function setInputValue(input, value) {
        const setter = Object.getOwnPropertyDescriptor(
            HTMLInputElement.prototype,
            "value"
        ).set;

        setter.call(input, value);

        input.dispatchEvent(
            new Event("input", { bubbles: true })
        );

        input.dispatchEvent(
            new Event("change", { bubbles: true })
        );

        input.dispatchEvent(
            new Event("blur", { bubbles: true })
        );
    }

    // --------------------------------------------------
    // Select a specific option in the time picker
    // --------------------------------------------------

    function selectOption(listbox, value) {
        const options = [...listbox.querySelectorAll('[role="option"]')];

        const option = options.find(
            el => el.textContent.trim() === value
        );

        if (!option) {
            throw new Error(
                `Could not find "${value}" in ${listbox.getAttribute("aria-label")} picker`
            );
        }

        option.click();
    }

    // --------------------------------------------------
    // Set time using the custom wheel picker
    // --------------------------------------------------

    async function setTime(button, hour, minute, period) {

        // Open picker
        button.click();

        await new Promise(resolve => setTimeout(resolve, 150));

        const dialog = document.querySelector(
            '.tf__pop[role="dialog"]'
        );

        if (!dialog) {
            throw new Error("Time picker dialog did not open.");
        }

        // Find the three wheels
        const hourWheel = dialog.querySelector(
            '.tf__wheel[aria-label="Hour"]'
        );

        const minuteWheel = dialog.querySelector(
            '.tf__wheel[aria-label="Minute"]'
        );

        const periodWheel = dialog.querySelector(
            '.tf__wheel[aria-label="AM or PM"]'
        );

        if (!hourWheel || !minuteWheel || !periodWheel) {
            throw new Error("Could not find time picker wheels.");
        }

        // Select hour
        selectOption(
            hourWheel,
            String(hour)
        );

        await new Promise(resolve => setTimeout(resolve, 50));

        // Select minute
        selectOption(
            minuteWheel,
            String(minute).padStart(2, "0")
        );

        await new Promise(resolve => setTimeout(resolve, 50));

        // Select AM / PM
        selectOption(
            periodWheel,
            period
        );

        await new Promise(resolve => setTimeout(resolve, 50));

        // Click OK
        const okButton = [...dialog.querySelectorAll("button")]
            .find(
                btn => btn.textContent.trim().toUpperCase() === "OK"
            );

        if (!okButton) {
            throw new Error("Could not find OK button.");
        }

        okButton.click();

        await new Promise(resolve => setTimeout(resolve, 150));
    }

    // --------------------------------------------------
    // Fill daily work descriptions
    // --------------------------------------------------

    rows.forEach((row, index) => {
        const input = row.querySelector(
            'input[placeholder="What you worked on"]'
        );

        if (input) {
            setInputValue(input, tasks[index]);
        }
    });

    // --------------------------------------------------
    // Set 9:00 AM → 4:00 PM for each day
    // --------------------------------------------------

    for (let i = 0; i < rows.length; i++) {

        const row = rows[i];

        const inButton = row.querySelector(
            'button[aria-label="In time"]'
        );

        const outButton = row.querySelector(
            'button[aria-label="Out time"]'
        );

        if (!inButton || !outButton) {
            console.warn(`Missing time buttons for row ${i + 1}`);
            continue;
        }

        console.log(`Setting Monday-Friday row ${i + 1}...`);

        // 9:00 AM
        await setTime(
            inButton,
            9,
            0,
            "AM"
        );

        // 4:00 PM
        await setTime(
            outButton,
            4,
            0,
            "PM"
        );
    }

    console.log("=================================");
    console.log("✅ WEEK 10 FILLED");
    console.log("🕘 In: 9:00 AM");
    console.log("🕓 Out: 4:00 PM");
    console.log("📝 Monday-Friday tasks filled");
    console.log("⚠️ NOT SUBMITTED");
    console.log("=================================");

    alert(
        "Week 10 has been filled.\n\n" +
        "In: 9:00 AM\n" +
        "Out: 4:00 PM\n\n" +
        "Review everything before manually submitting."
    );
})();




// week 9
    const tasks = [
        "Worked on the existing Flutter application screens and refined the UI according to the application requirements.",
        "Implemented changes to the application navigation flow and improved transitions between different modules.",
        "Integrated existing FastAPI endpoints with the Flutter screens and handled API response data.",
        "Implemented form validation and improved error handling for invalid or incomplete user inputs.",
        "Tested the integrated modules and fixed issues related to API responses and UI state updates."
    ];

    const tasks = [
        "Integrated additional FastAPI backend APIs with the Flutter application and mapped the API responses to the required application models.",
        "Implemented Flutter data models for handling structured responses received from the FastAPI backend.",
        "Improved asynchronous API calls and loading-state handling across the application.",
        "Added error handling for network failures, invalid API responses, and server-side errors.",
        "Tested the API integration with different input conditions and backend responses and fixed integration issues."
    ];
const tasks = [
    "Worked on the existing authentication flow and integrated authentication APIs with the Flutter application.",
    "Implemented handling of authentication tokens and user session information.",
    "Updated protected application screens to ensure authenticated users could access the required functionality.",
    "Added handling for authentication failures, expired sessions, and invalid credentials.",
    "Tested login and logout flows under different scenarios and fixed authentication-related issues."
];

const tasks = [
    "Implemented additional functionality within the main application module based on the assigned requirements.",
    "Connected the newly implemented functionality with the corresponding FastAPI endpoints.",
    "Added UI states for successful operations, loading states, and failure conditions.",
    "Implemented validation and conditional logic for different user actions.",
    "Tested the feature using multiple input combinations and backend responses and fixed functional issues."
];

const tasks = [
    "Worked on FastAPI backend endpoints required by the Flutter mobile application.",
    "Implemented backend request validation and improved API response structures.",
    "Worked on database operations associated with the newly developed API functionality.",
    "Added error handling for invalid requests and unavailable data.",
    "Tested the backend endpoints and integrated the updated APIs with the Flutter application."
];

const tasks = [
    "Refined existing Flutter screens to improve usability and consistency across the application.",
    "Improved application state handling for screens that depend on asynchronous backend data.",
    "Added appropriate loading indicators and empty-data states.",
    "Improved navigation and handling of different user actions within the application.",
    "Tested the updated UI and fixed visual and functional issues identified during testing."
];

const tasks = [
    "Worked on the booking-related functionality of the Flutter application.",
    "Integrated the required booking APIs with the Flutter application.",
    "Implemented validation for booking details before submitting requests to the FastAPI backend.",
    "Added handling for different booking statuses and backend responses.",
    "Tested the complete booking flow and fixed issues identified during end-to-end testing."
];

const tasks = [
    "Implemented functionality for modifying existing application data.",
    "Integrated the corresponding update APIs with the Flutter application.",
    "Added validation and confirmation handling before submitting modifications.",
    "Implemented appropriate UI updates after successful backend operations.",
    "Tested update and modification scenarios and fixed state synchronization issues."
];

const tasks = [
    "Performed functional testing of the major Flutter application modules.",
    "Identified and reproduced issues related to API communication and application state.",
    "Debugged FastAPI errors and corrected incorrect request and response handling.",
    "Fixed Flutter UI, navigation, and data-handling issues identified during testing.",
    "Performed regression testing after applying the fixes."
];
const tasks = [
    "Reviewed existing Flutter code and identified areas that could be improved and optimized.",
    "Reduced unnecessary API calls and improved data-loading behavior.",
    "Refactored repetitive frontend code into reusable components and functions.",
    "Improved FastAPI API handling and optimized selected database operations.",
    "Tested the optimized modules and cleaned up unused code and minor technical issues."
];

const tasks = [
    "Reviewed newly requested application changes and identified the affected modules.",
    "Implemented the required Flutter-side changes based on the updated requirements.",
    "Updated the FastAPI backend to support the modified functionality.",
    "Integrated and tested the updated frontend and backend behavior.",
    "Addressed issues found during testing and completed verification of the requested changes."
];

const tasks = [
    "Worked on integrating an additional application module with the existing system.",
    "Implemented the required Flutter screens and user interactions for the new module.",
    "Connected the new screens with the corresponding FastAPI APIs.",
    "Added validation and error handling for the new functionality.",
    "Tested the complete feature flow and fixed integration issues."
];

const tasks = [
    "Reviewed the FastAPI endpoints currently used by the Flutter mobile application.",
    "Improved request validation and backend exception handling.",
    "Updated database queries and response processing for selected backend endpoints.",
    "Tested API behavior using valid and invalid requests.",
    "Integrated the backend improvements with Flutter and performed regression testing."
];

const tasks = [
    "Performed module-level testing of the Flutter application.",
    "Tested API integration under different network conditions.",
    "Checked validation and error-handling behavior throughout the application.",
    "Tested different user workflows and identified inconsistencies.",
    "Fixed the identified functional issues and performed regression testing."
];

const tasks = [
    "Reviewed the application configuration required for testing and deployment environments.",
    "Updated API configuration and environment-specific settings.",
    "Tested communication between the Flutter application and the deployed FastAPI backend.",
    "Identified and resolved configuration-related API connectivity issues.",
    "Tested the major application workflows using the updated backend environment."
];

const tasks = [
    "Reviewed issues reported during application testing.",
    "Reproduced and investigated the reported application issues.",
    "Implemented fixes for frontend-related problems in the Flutter application.",
    "Fixed FastAPI API and data-handling issues.",
    "Performed regression testing and documented the resolved issues."
];

const tasks = [
    "Refined existing application features based on testing feedback.",
    "Improved UI behavior and validation across frequently used Flutter screens.",
    "Updated API handling for improved consistency between the frontend and backend.",
    "Improved user feedback for successful and failed operations.",
    "Performed end-to-end testing and completed the final feature refinements."
];

const tasks = [
    "Tested the complete Flutter application workflow from authentication through the major application modules.",
    "Verified communication between the Flutter frontend and FastAPI backend.",
    "Tested different user actions and corresponding backend response scenarios.",
    "Identified remaining integration issues and implemented fixes.",
    "Performed regression testing across all major application modules."
];

const tasks = [
    "Reviewed the completed application modules and identified remaining improvements.",
    "Cleaned up the Flutter codebase and improved code organization.",
    "Reviewed FastAPI endpoints and updated backend implementation where required.",
    "Prepared technical documentation for the implemented application modules and APIs.",
    "Documented important application workflows and configuration details and performed final testing."
];

const tasks = [
    "Performed final functional testing of the completed Flutter application.",
    "Verified all major FastAPI endpoints used by the mobile application.",
    "Tested the complete application workflow and checked for remaining issues.",
    "Fixed final bugs identified during testing and performed regression testing.",
    "Reviewed the completed internship work and documented the major technical contributions and outcomes."
];
