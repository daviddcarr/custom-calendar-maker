const defaultCalendar = {
    "name":"My Calendar",
    "months":[
        {"name":"January","days":31},
        {"name":"February","days":28},
        {"name":"March","days":31},
        {"name":"April","days":30},
        {"name":"May","days":31},
        {"name":"June","days":30},
        {"name":"July","days":31},
        {"name":"August","days":31},
        {"name":"September","days":30},
        {"name":"October","days":31},
        {"name":"November","days":30},
        {"name":"December","days":30}
    ],
    "startDay":0,
    "startYear":2023,
    "years":2,
    "weekdays":[
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ],
    "categories":[
        {"name":"Holiday","color":"red"},
        {"name":"Birthday","color":"purple"},
        {"name":"Appointment","color":"blue"}
    ],
    "events":[
        {
            "name":"New Year's Day",
            "date":1,
            "month":0,
            "year":0,
            "category":0,
            "description":"New Year's Day is the first day of the Gregorian calendar, which is widely used in many countries such as the USA.",
            "trackableItems":[
                {
                    "name":"Workouts",
                    "value":1
                },
            ]
        }
    ],
    "trackableItems":[
        "Workouts",
        "Meditation",
    ],
    "checkedDays": [
        {"day":8,"month":8,"year":0}
    ]
}
export default defaultCalendar