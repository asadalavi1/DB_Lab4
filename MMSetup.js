db.issue.insertMany([
  { year: '2016',
    period: '4',
    volume: '1',
    title: 'mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis',
    status: 'Published' },
  { year: '2016',
    period: '4',
    volume: '2',
    title: 'justo morbi ut odio cras mi pede',
    status: 'Published' },
  { year: '2017',
    period: '1',
    volume: '1',
    title: 'ornare consequat lectus in est risus auctor',
    status: 'Scheduled' },
]);


db.manuscript.insertMany([
  { id: '1',
    title: 'accumsan odio',
    description: 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae Mauris viverra diam vitae quam. Suspendisse potenti.',
    ri_code: '92',
    status: 'Under Review',
    issue_vol: null,
    issue_year: null,
    num_pages: null,
    start_page: null,
    date_changed: '2017-04-26 16:24:18',
    date_created: '2017-04-26 16:24:18',
    review_date: '2017-04-27 16:24:18',
    assigned_editor: '1',
    filename: null },
  { id: '2',
    title: 'sapien cum sociis natoque penatibus et magnis dis',
    description: 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.',
    ri_code: '31',
    status: 'Accepted',
    issue_vol: null,
    issue_year: null,
    num_pages: null,
    start_page: null,
    date_changed: '2017-04-26 16:24:18',
    date_created: '2017-04-26 16:24:18',
    review_date: '2017-04-26 22:24:18',
    assigned_editor: '1',
    filename: null },
  { id: '3',
    title: 'a libero nam dui proin leo odio',
    description: 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',
    ri_code: '94',
    status: 'Rejected',
    issue_vol: null,
    issue_year: null,
    num_pages: null,
    start_page: null,
    date_changed: '2017-04-26 16:24:18',
    date_created: '2017-04-26 16:24:18',
    review_date: '2017-04-26 20:24:18',
    assigned_editor: '1',
    filename: null },
  { id: '4',
    title: 'integer ac leo',
    description: 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    ri_code: '65',
    status: 'Scheduled',
    issue_vol: '1',
    issue_year: '2017',
    num_pages: '24',
    start_page: '1',
    date_changed: '2017-04-26 16:24:18',
    date_created: '2017-04-26 16:24:18',
    review_date: '2017-04-26 23:24:18',
    assigned_editor: '1',
    filename: null },
  { id: '5',
    title: 'donec posuere metus vitae ipsum aliquam',
    description: 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    ri_code: '82',
    status: 'Typesetting',
    issue_vol: null,
    issue_year: null,
    num_pages: null,
    start_page: null,
    date_changed: '2017-04-26 16:24:18',
    date_created: '2017-04-26 16:24:18',
    review_date: '2017-04-26 20:24:18',
    assigned_editor: '1',
    filename: null },
  { id: '6',
    title: 'metus arcu adipiscing',
    description: 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    ri_code: '74',
    status: 'Published',
    issue_vol: '1',
    issue_year: '2016',
    num_pages: '12',
    start_page: '1',
    date_changed: '2017-04-26 16:24:18',
    date_created: '2017-04-26 16:24:18',
    review_date: '2017-04-26 17:24:18',
    assigned_editor: '1',
    filename: null },
  { id: '7',
    title: 'luctus et ultrices',
    description: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
    ri_code: '64',
    status: 'Published',
    issue_vol: '2',
    issue_year: '2016',
    num_pages: '22',
    start_page: '1',
    date_changed: '2017-04-26 16:24:18',
    date_created: '2017-04-26 16:24:18',
    review_date: '2017-04-26 19:44:18',
    assigned_editor: '1',
    filename: null },
  { id: '8',
    title: 'a feugiat et eros vestibulum',
    description: 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    ri_code: '85',
    status: 'Under Review',
    issue_vol: null,
    issue_year: null,
    num_pages: null,
    start_page: null,
    date_changed: '2017-04-26 16:24:19',
    date_created: '2017-04-26 16:24:19',
    review_date: '2017-04-27 10:24:18',
    assigned_editor: '1',
    filename: null },
  { id: '9',
    title: 'justo sollicitudin ut suscipit',
    description: 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
    ri_code: '20',
    status: 'Submitted',
    issue_vol: null,
    issue_year: null,
    num_pages: null,
    start_page: null,
    date_changed: '2017-04-26 16:24:19',
    date_created: '2017-04-26 16:24:19',
    review_date: 'NULL',
    assigned_editor: '1',
    filename: null },
  { id: '10',
    title: 'ut suscipit a feugiat et',
    description: 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
    ri_code: '66',
    status: 'Submitted',
    issue_vol: null,
    issue_year: null,
    num_pages: null,
    start_page: null,
    date_changed: '2017-04-26 16:24:19',
    date_created: '2017-04-26 16:24:19',
    review_date: 'NULL',
    assigned_editor: '1',
    filename: null },
  { id: '11',
    title: 'ut rhoncus aliquet',
    description: 'Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.',
    ri_code: '111',
    status: 'Submitted',
    issue_vol: null,
    issue_year: null,
    num_pages: null,
    start_page: null,
    date_changed: '2017-04-26 16:24:19',
    date_created: '2017-04-26 16:24:19',
    review_date: 'NULL',
    assigned_editor: '1',
    filename: null },
  { id: '12',
    title: 'at vulputate vitae nisl aenean lectus',
    description: 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
    ri_code: '68',
    status: 'Submitted',
    issue_vol: null,
    issue_year: null,
    num_pages: null,
    start_page: null,
    date_changed: '2017-04-26 16:24:19',
    date_created: '2017-04-26 16:24:19',
    review_date: 'NULL',
    assigned_editor: '1',
    filename: null },
  { id: '13',
    title: 'eget eros elementum pellentesque',
    description: 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    ri_code: '25',
    status: 'Submitted',
    issue_vol: null,
    issue_year: null,
    num_pages: null,
    start_page: null,
    date_changed: '2017-04-26 16:24:19',
    date_created: '2017-04-26 16:24:19',
    review_date: 'NULL',
    assigned_editor: '1',
    filename: null },
  { id: '14',
    title: 'ut dolor morbi vel lectus in quam',
    description: 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    ri_code: '86',
    status: 'Submitted',
    issue_vol: null,
    issue_year: null,
    num_pages: null,
    start_page: null,
    date_changed: '2017-04-26 16:24:19',
    date_created: '2017-04-26 16:24:19',
    review_date: 'NULL',
    assigned_editor: '1',
    filename: null },
  { id: '15',
    title: 'ut ultrices vel augue vestibulum ante ipsum',
    description: 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
    ri_code: '67',
    status: 'Submitted',
    issue_vol: null,
    issue_year: null,
    num_pages: null,
    start_page: null,
    date_changed: '2017-04-26 16:24:19',
    date_created: '2017-04-26 16:24:19',
    review_date: 'NULL',
    assigned_editor: '1',
    filename: null },
  { id: '16',
    title: 'vestibulum rutrum rutrum neque',
    description: 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    ri_code: '15',
    status: 'Submitted',
    issue_vol: null,
    issue_year: null,
    num_pages: null,
    start_page: null,
    date_changed: '2017-04-26 16:24:19',
    date_created: '2017-04-26 16:24:19',
    review_date: 'NULL',
    assigned_editor: '1',
    filename: null }
]);


db.manuscript_author.insertMany([
    {
      "manuscript_id": "1",
      "author_id": "2",
      "rank": "1",
    },
    {
      "manuscript_id": "1",
      "author_id": "4",
      "rank": "2",
    },
    {
      "manuscript_id": "1",
      "author_id": "23",
      "rank": "3",
    },
    {
      "manuscript_id": "2",
      "author_id": "11",
      "rank": "1",
    },
    {
      "manuscript_id": "2",
      "author_id": "23",
      "rank": "2",
    },
    {
      "manuscript_id": "3",
      "author_id": "2",
      "rank": "4",
    },
    {
      "manuscript_id": "3",
      "author_id": "5",
      "rank": "1",
    },
    {
      "manuscript_id": "3",
      "author_id": "6",
      "rank": "2",
    },
    {
      "manuscript_id": "3",
      "author_id": "10",
      "rank": "3",
    },
    {
      "manuscript_id": "4",
      "author_id": "17",
      "rank": "1",
    },
    {
      "manuscript_id": "4",
      "author_id": "18",
      "rank": "2",
    },
    {
      "manuscript_id": "5",
      "author_id": "22",
      "rank": "1",
    },
    {
      "manuscript_id": "6",
      "author_id": "27",
      "rank": "1",
    },
    {
      "manuscript_id": "6",
      "author_id": "28",
      "rank": "2",
    },
    {
      "manuscript_id": "6",
      "author_id": "29",
      "rank": "3",
    },
    {
      "manuscript_id": "7",
      "author_id": "6",
      "rank": "1",
    },
    {
      "manuscript_id": "8",
      "author_id": "2",
      "rank": "3",
    },
    {
      "manuscript_id": "8",
      "author_id": "4",
      "rank": "1",
    },
    {
      "manuscript_id": "8",
      "author_id": "6",
      "rank": "2",
    },
    {
      "manuscript_id": "9",
      "author_id": "16",
      "rank": "1",
    },
    {
      "manuscript_id": "9",
      "author_id": "17",
      "rank": "2",
    },
    {
      "manuscript_id": "10",
      "author_id": "10",
      "rank": "1",
    },
    {
      "manuscript_id": "11",
      "author_id": "18",
      "rank": "1",
    },
    {
      "manuscript_id": "11",
      "author_id": "29",
      "rank": "2",
    },
    {
      "manuscript_id": "12",
      "author_id": "23",
      "rank": "2",
    },
    {
      "manuscript_id": "12",
      "author_id": "27",
      "rank": "1",
    },
    {
      "manuscript_id": "13",
      "author_id": "2",
      "rank": "2",
    },
    {
      "manuscript_id": "13",
      "author_id": "4",
      "rank": "4",
    },
    {
      "manuscript_id": "13",
      "author_id": "10",
      "rank": "3",
    },
    {
      "manuscript_id": "13",
      "author_id": "11",
      "rank": "1",
    },
    {
      "manuscript_id": "13",
      "author_id": "29",
      "rank": "5",
    },
    {
      "manuscript_id": "14",
      "author_id": "17",
      "rank": "3",
    },
    {
      "manuscript_id": "14",
      "author_id": "18",
      "rank": "2",
    },
    {
      "manuscript_id": "14",
      "author_id": "24",
      "rank": "1",
    },
    {
      "manuscript_id": "15",
      "author_id": "5",
      "rank": "2",
    },
    {
      "manuscript_id": "15",
      "author_id": "26",
      "rank": "1",
    },
    {
      "manuscript_id": "16",
      "author_id": "5",
      "rank": "1",
    },
    {
      "manuscript_id": "16",
      "author_id": "23",
      "rank": "3",
    },
    {
      "manuscript_id": "16",
      "author_id": "25",
      "rank": "2",
    }
]);


db.reviewer_interest.insertMany([
    {
      "reviewer_id": "3",
      "ri_code": "31",
      "ri_code": null
    },
    {
      "reviewer_id": "3",
      "ri_code": "92",
      "ri_code": null
    },
    {
      "reviewer_id": "3",
      "ri_code": "120",
      "ri_code": null
    },
    {
      "reviewer_id": "7",
      "ri_code": "65",
      "ri_code": null
    },
    {
      "reviewer_id": "7",
      "ri_code": "94",
      "ri_code": null
    },
    {
      "reviewer_id": "8",
      "ri_code": "22",
      "ri_code": null
    },
    {
      "reviewer_id": "8",
      "ri_code": "74",
      "ri_code": null
    },
    {
      "reviewer_id": "8",
      "ri_code": "82",
      "ri_code": null
    },
    {
      "reviewer_id": "9",
      "ri_code": "64",
      "ri_code": null
    },
    {
      "reviewer_id": "9",
      "ri_code": "85",
      "ri_code": null
    },
    {
      "reviewer_id": "9",
      "ri_code": "121",
      "ri_code": null
    },
    {
      "reviewer_id": "13",
      "ri_code": "31",
      "ri_code": null
    },
    {
      "reviewer_id": "13",
      "ri_code": "92",
      "ri_code": null
    },
    {
      "reviewer_id": "14",
      "ri_code": "1",
      "ri_code": null
    },
    {
      "reviewer_id": "14",
      "ri_code": "65",
      "ri_code": null
    },
    {
      "reviewer_id": "14",
      "ri_code": "94",
      "ri_code": null
    },
    {
      "reviewer_id": "15",
      "ri_code": "70",
      "ri_code": null
    },
    {
      "reviewer_id": "15",
      "ri_code": "74",
      "ri_code": null
    },
    {
      "reviewer_id": "15",
      "ri_code": "82",
      "ri_code": null
    },
    {
      "reviewer_id": "19",
      "ri_code": "64",
      "ri_code": null
    },
    {
      "reviewer_id": "19",
      "ri_code": "85",
      "ri_code": null
    },
    {
      "reviewer_id": "19",
      "ri_code": "102",
      "ri_code": null
    },
    {
      "reviewer_id": "20",
      "ri_code": "31",
      "ri_code": null
    },
    {
      "reviewer_id": "20",
      "ri_code": "92",
      "ri_code": null
    },
    {
      "reviewer_id": "20",
      "ri_code": "94",
      "ri_code": null
    },
    {
      "reviewer_id": "21",
      "ri_code": "65",
      "ri_code": null
    },
    {
      "reviewer_id": "21",
      "ri_code": "82",
      "ri_code": null
    },
    {
      "reviewer_id": "30",
      "ri_code": "64",
      "ri_code": null
    },
    {
      "reviewer_id": "30",
      "ri_code": "74",
      "ri_code": null
    },
    {
      "reviewer_id": "30",
      "ri_code": "85",
      "ri_code": null
    }
]);


db.manuscript_reviewer.insertMany([
    {
      "reviewer_id": "3",
      "manuscript_id": "1",
      "result": "-",
      "clarity": null,
      "method": null,
      "contribution": null,
      "appropriate": null
    },
    {
      "reviewer_id": "3",
      "manuscript_id": "2",
      "result": "y",
      "clarity": "8",
      "method": "7",
      "contribution": "9",
      "appropriate": "10"
    },
    {
      "reviewer_id": "7",
      "manuscript_id": "3",
      "result": "n",
      "clarity": "5",
      "method": "5",
      "contribution": "5",
      "appropriate": "6"
    },
    {
      "reviewer_id": "7",
      "manuscript_id": "4",
      "result": "y",
      "clarity": "10",
      "method": "10",
      "contribution": "10",
      "appropriate": "10"
    },
    {
      "reviewer_id": "8",
      "manuscript_id": "5",
      "result": "y",
      "clarity": "8",
      "method": "8",
      "contribution": "8",
      "appropriate": "8"
    },
    {
      "reviewer_id": "8",
      "manuscript_id": "6",
      "result": "y",
      "clarity": "9",
      "method": "9",
      "contribution": "9",
      "appropriate": "9"
    },
    {
      "reviewer_id": "9",
      "manuscript_id": "7",
      "result": "y",
      "clarity": "10",
      "method": "10",
      "contribution": "10",
      "appropriate": "10"
    },
    {
      "reviewer_id": "9",
      "manuscript_id": "8",
      "result": "-",
      "clarity": null,
      "method": null,
      "contribution": null,
      "appropriate": null
    },
    {
      "reviewer_id": "13",
      "manuscript_id": "1",
      "result": "-",
      "clarity": null,
      "method": null,
      "contribution": null,
      "appropriate": null
    },
    {
      "reviewer_id": "13",
      "manuscript_id": "2",
      "result": "y",
      "clarity": "10",
      "method": "10",
      "contribution": "9",
      "appropriate": "10"
    },
    {
      "reviewer_id": "14",
      "manuscript_id": "3",
      "result": "n",
      "clarity": "2",
      "method": "4",
      "contribution": "6",
      "appropriate": "8"
    },
    {
      "reviewer_id": "14",
      "manuscript_id": "4",
      "result": "y",
      "clarity": "9",
      "method": "9",
      "contribution": "10",
      "appropriate": "10"
    },
    {
      "reviewer_id": "15",
      "manuscript_id": "5",
      "result": "y",
      "clarity": "9",
      "method": "9",
      "contribution": "9",
      "appropriate": "9"
    },
    {
      "reviewer_id": "15",
      "manuscript_id": "6",
      "result": "y",
      "clarity": "7",
      "method": "8",
      "contribution": "10",
      "appropriate": "10"
    },
    {
      "reviewer_id": "19",
      "manuscript_id": "7",
      "result": "y",
      "clarity": "10",
      "method": "10",
      "contribution": "10",
      "appropriate": "10"
    },
    {
      "reviewer_id": "19",
      "manuscript_id": "8",
      "result": "-",
      "clarity": null,
      "method": null,
      "contribution": null,
      "appropriate": null
    },
    {
      "reviewer_id": "20",
      "manuscript_id": "1",
      "result": "-",
      "clarity": null,
      "method": null,
      "contribution": null,
      "appropriate": null
    },
    {
      "reviewer_id": "20",
      "manuscript_id": "2",
      "result": "y",
      "clarity": "9",
      "method": "9",
      "contribution": "9",
      "appropriate": "9"
    },
    {
      "reviewer_id": "20",
      "manuscript_id": "3",
      "result": "n",
      "clarity": "1",
      "method": "1",
      "contribution": "2",
      "appropriate": "3"
    },
    {
      "reviewer_id": "21",
      "manuscript_id": "4",
      "result": "y",
      "clarity": "8",
      "method": "10",
      "contribution": "8",
      "appropriate": "9"
    },
    {
      "reviewer_id": "21",
      "manuscript_id": "5",
      "result": "y",
      "clarity": "8",
      "method": "10",
      "contribution": "9",
      "appropriate": "7"
    },
    {
      "reviewer_id": "30",
      "manuscript_id": "6",
      "result": "y",
      "clarity": "10",
      "method": "7",
      "contribution": "7",
      "appropriate": "10"
    },
    {
      "reviewer_id": "30",
      "manuscript_id": "7",
      "result": "y",
      "clarity": "9",
      "method": "9",
      "contribution": "9",
      "appropriate": "9"
    },
    {
      "reviewer_id": "30",
      "manuscript_id": "8",
      "result": "-",
      "clarity": null,
      "method": null,
      "contribution": null,
      "appropriate": null
    }
]);


db.person.insertMany([
    {
      "id": "0",
      "first_name": "Debanjum",
      "last_name": "Solanky",
      "type": "2",
      "email": "dibz@dibbymail.dib",
      "affiliation": "Dibby Dabby Doo",
      "mailing_address": "69 Dub Lane"
    },
    {
      "id": "1",
      "first_name": "Tabby",
      "last_name": "Zannetti",
      "type": "1",
      "email": "tzannetti0@mozilla.org",
      "affiliation": "Ecole Nationale de la Statistique et de l\\'Administration Economique",
      "mailing_address": "6 Moose Court"
    },
    {
      "id": "2",
      "first_name": "Howard",
      "last_name": "Tappor",
      "type": "2",
      "email": "htappor1@answers.com",
      "affiliation": "William Tyndale College",
      "mailing_address": "9 Summer Ridge Pass"
    },
    {
      "id": "3",
      "first_name": "Euell",
      "last_name": "Aleshintsev",
      "type": "3",
      "email": "ealeshintsev2@slashdot.org",
      "affiliation": "Central Academy of Fine Art",
      "mailing_address": "2254 2nd Plaza"
    },
    {
      "id": "4",
      "first_name": "Eben",
      "last_name": "Rolfe",
      "type": "2",
      "email": "erolfe3@pbs.org",
      "affiliation": "Universidad de Carabobo",
      "mailing_address": "2 Vidon Point"
    },
    {
      "id": "5",
      "first_name": "Flem",
      "last_name": "Thompson",
      "type": "2",
      "email": "fthompson4@squarespace.com",
      "affiliation": "Escuela Superiore de Administración Pública",
      "mailing_address": "95879 Graceland Point"
    },
    {
      "id": "6",
      "first_name": "Billie",
      "last_name": "Nieass",
      "type": "2",
      "email": "bnieass5@spiegel.de",
      "affiliation": "University of Kota",
      "mailing_address": "63703 Amoth Terrace"
    },
    {
      "id": "7",
      "first_name": "Marylee",
      "last_name": "MacClure",
      "type": "3",
      "email": "mmacclure6@simplemachines.org",
      "affiliation": "Central Methodist College",
      "mailing_address": "2 Golf Plaza"
    },
    {
      "id": "8",
      "first_name": "Michelina",
      "last_name": "Cousans",
      "type": "3",
      "email": "mcousans7@yale.edu",
      "affiliation": "2nd Military Medical University",
      "mailing_address": "258 Schurz Trail"
    },
    {
      "id": "9",
      "first_name": "Ambros",
      "last_name": "Seeler",
      "type": "3",
      "email": "aseeler8@bbc.co.uk",
      "affiliation": "Indus Institute of Higher Education",
      "mailing_address": "4992 Prentice Terrace"
    },
    {
      "id": "10",
      "first_name": "Cameron",
      "last_name": "Gladdish",
      "type": "2",
      "email": "cgladdish9@webeden.co.uk",
      "affiliation": "Federal University of Petroleum Resources",
      "mailing_address": "0 Ohio Plaza"
    },
    {
      "id": "11",
      "first_name": "Jermain",
      "last_name": "Barnbrook",
      "type": "2",
      "email": "jbarnbrooka@unesco.org",
      "affiliation": "Carroll College Helena",
      "mailing_address": "2 Mosinee Park"
    },
    {
      "id": "12",
      "first_name": "Bucky",
      "last_name": "Dummett",
      "type": "2",
      "email": "bdummettb@over-blog.com",
      "affiliation": "Université de Lubumbashi",
      "mailing_address": "471 Hallows Pass"
    },
    {
      "id": "13",
      "first_name": "Fernando",
      "last_name": "Viste",
      "type": "3",
      "email": "fvistec@goo.gl",
      "affiliation": "Universitas Wisnuwardhana",
      "mailing_address": "680 Hoepker Circle"
    },
    {
      "id": "14",
      "first_name": "Daffy",
      "last_name": "Kidston",
      "type": "3",
      "email": "dkidstond@weibo.com",
      "affiliation": "Kent State University - Stark",
      "mailing_address": "2 Johnson Road"
    },
    {
      "id": "15",
      "first_name": "Dame",
      "last_name": "Yurenev",
      "type": "3",
      "email": "dyureneve@surveymonkey.com",
      "affiliation": "Northern Illinois University",
      "mailing_address": "99 Brentwood Alley"
    },
    {
      "id": "16",
      "first_name": "Burg",
      "last_name": "Blaine",
      "type": "2",
      "email": "bblainef@hc360.com",
      "affiliation": "Metropolitan State University",
      "mailing_address": "841 Prairie Rose Parkway"
    },
    {
      "id": "17",
      "first_name": "Willy",
      "last_name": "Vizor",
      "type": "2",
      "email": "wvizorg@wikispaces.com",
      "affiliation": "Universitas Negeri Surabaya",
      "mailing_address": "7 Mockingbird Road"
    },
    {
      "id": "18",
      "first_name": "Amalea",
      "last_name": "Lempenny",
      "type": "2",
      "email": "alempennyh@devhub.com",
      "affiliation": "Sogang University",
      "mailing_address": "262 Moulton Crossing"
    },
    {
      "id": "19",
      "first_name": "Gerty",
      "last_name": "Brittian",
      "type": "3",
      "email": "gbrittiani@indiegogo.com",
      "affiliation": "Tamil Nadu Dr. Ambedkar Law University",
      "mailing_address": "2378 Sunbrook Junction"
    },
    {
      "id": "20",
      "first_name": "Lesya",
      "last_name": "Pietasch",
      "type": "3",
      "email": "lpietaschj@google.com.br",
      "affiliation": "Universidad Regiomontana",
      "mailing_address": "48 Westerfield Way"
    },
    {
      "id": "21",
      "first_name": "Bealle",
      "last_name": "Schuster",
      "type": "3",
      "email": "bschusterk@discovery.com",
      "affiliation": "Jordan Academy of Music / Higher Institute of Music",
      "mailing_address": "2329 Elgar Junction"
    },
    {
      "id": "22",
      "first_name": "Aloysius",
      "last_name": "Monckman",
      "type": "2",
      "email": "amonckmanl@netvibes.com",
      "affiliation": "Université de Toamasina",
      "mailing_address": "401 Moland Court"
    },
    {
      "id": "23",
      "first_name": "Max",
      "last_name": "Massei",
      "type": "2",
      "email": "mmasseim@chronoengine.com",
      "affiliation": "Europäische Fachhochschule",
      "mailing_address": "41 Anzinger Terrace"
    },
    {
      "id": "24",
      "first_name": "Jerrold",
      "last_name": "Gibbs",
      "type": "2",
      "email": "jgibbsn@biblegateway.com",
      "affiliation": "Universidad Privada San Pedro",
      "mailing_address": "774 West Point"
    },
    {
      "id": "25",
      "first_name": "Lucien",
      "last_name": "Sudy",
      "type": "2",
      "email": "lsudyo@cocolog-nifty.com",
      "affiliation": "Midland Lutheran College",
      "mailing_address": "10 Bellgrove Alley"
    },
    {
      "id": "26",
      "first_name": "Bette-ann",
      "last_name": "de Keep",
      "type": "2",
      "email": "bdekeepp@globo.com",
      "affiliation": "Debre Markos University",
      "mailing_address": "133 Elmside Crossing"
    },
    {
      "id": "27",
      "first_name": "Valida",
      "last_name": "Balbeck",
      "type": "2",
      "email": "vbalbeckq@sun.com",
      "affiliation": "Ecole Supérieure de Physique et de Chimie Industrielles",
      "mailing_address": "032 Barby Drive"
    },
    {
      "id": "28",
      "first_name": "Aili",
      "last_name": "Slimon",
      "type": "2",
      "email": "aslimonr@facebook.com",
      "affiliation": "Institut National des Sciences Appliquées de Lyon",
      "mailing_address": "367 Bashford Court"
    },
    {
      "id": "29",
      "first_name": "Packston",
      "last_name": "Hartland",
      "type": "2",
      "email": "phartlands@aboutads.info",
      "affiliation": "Universidad Autónoma Metropolitana - Iztapalapa",
      "mailing_address": "686 Lake View Avenue"
    },
    {
      "id": "30",
      "first_name": "Sholom",
      "last_name": "Overshott",
      "type": "3",
      "email": "sovershottt@arizona.edu",
      "affiliation": "Turku School of Economics and Business Administration",
      "mailing_address": "922 Fieldstone Center"
    }
]);


db.ri_code.insertMany([
    {
      "id": "1",
      "interest": "Agricultural engineering"
    },
    {
      "id": "2",
      "interest": "Biochemical engineering"
    },
    {
      "id": "3",
      "interest": "Biomechanical engineering"
    },
    {
      "id": "4",
      "interest": "Ergonomics"
    },
    {
      "id": "5",
      "interest": "Food engineering"
    },
    {
      "id": "6",
      "interest": "Bioprocess engineering"
    },
    {
      "id": "7",
      "interest": "Genetic engineering"
    },
    {
      "id": "8",
      "interest": "Human genetic engineering"
    },
    {
      "id": "9",
      "interest": "Metabolic engineering"
    },
    {
      "id": "10",
      "interest": "Molecular engineering"
    },
    {
      "id": "11",
      "interest": "Neural engineering"
    },
    {
      "id": "12",
      "interest": "Protein engineering"
    },
    {
      "id": "13",
      "interest": "Rehabilitation engineering"
    },
    {
      "id": "14",
      "interest": "Tissue engineering"
    },
    {
      "id": "15",
      "interest": "Aquatic and environmental engineering"
    },
    {
      "id": "16",
      "interest": "Architectural engineering"
    },
    {
      "id": "17",
      "interest": "Civionic engineering"
    },
    {
      "id": "18",
      "interest": "Construction engineering"
    },
    {
      "id": "19",
      "interest": "Earthquake engineering"
    },
    {
      "id": "20",
      "interest": "Earth systems engineering and management"
    },
    {
      "id": "21",
      "interest": "Ecological engineering"
    },
    {
      "id": "22",
      "interest": "Environmental engineering"
    },
    {
      "id": "23",
      "interest": "Geomatics engineering"
    },
    {
      "id": "24",
      "interest": "Geotechnical engineering"
    },
    {
      "id": "25",
      "interest": "Highway engineering"
    },
    {
      "id": "26",
      "interest": "Hydraulic engineering"
    },
    {
      "id": "27",
      "interest": "Landscape engineering"
    },
    {
      "id": "28",
      "interest": "Land development engineering"
    },
    {
      "id": "29",
      "interest": "Pavement engineering"
    },
    {
      "id": "30",
      "interest": "Railway systems engineering"
    },
    {
      "id": "31",
      "interest": "River engineering"
    },
    {
      "id": "32",
      "interest": "Sanitary engineering"
    },
    {
      "id": "33",
      "interest": "Sewage engineering"
    },
    {
      "id": "34",
      "interest": "Structural engineering"
    },
    {
      "id": "35",
      "interest": "Surveying"
    },
    {
      "id": "36",
      "interest": "Traffic engineering"
    },
    {
      "id": "37",
      "interest": "Transportation engineering"
    },
    {
      "id": "38",
      "interest": "Urban engineering"
    },
    {
      "id": "39",
      "interest": "Irrigation and agriculture engineering"
    },
    {
      "id": "40",
      "interest": "Explosives engineering"
    },
    {
      "id": "41",
      "interest": "Biomolecular engineering"
    },
    {
      "id": "42",
      "interest": "Ceramics engineering"
    },
    {
      "id": "43",
      "interest": "Broadcast engineering"
    },
    {
      "id": "44",
      "interest": "Building engineering"
    },
    {
      "id": "45",
      "interest": "Signal Processing"
    },
    {
      "id": "46",
      "interest": "Computer engineering"
    },
    {
      "id": "47",
      "interest": "Power systems engineering"
    },
    {
      "id": "48",
      "interest": "Control engineering"
    },
    {
      "id": "49",
      "interest": "Telecommunications engineering"
    },
    {
      "id": "50",
      "interest": "Electronic engineering"
    },
    {
      "id": "51",
      "interest": "Instrumentation engineering"
    },
    {
      "id": "52",
      "interest": "Network engineering"
    },
    {
      "id": "53",
      "interest": "Neuromorphic engineering"
    },
    {
      "id": "54",
      "interest": "Engineering Technology"
    },
    {
      "id": "55",
      "interest": "Integrated engineering"
    },
    {
      "id": "56",
      "interest": "Value engineering"
    },
    {
      "id": "57",
      "interest": "Cost engineering"
    },
    {
      "id": "58",
      "interest": "Fire protection engineering"
    },
    {
      "id": "59",
      "interest": "Domain engineering"
    },
    {
      "id": "60",
      "interest": "Engineering economics"
    },
    {
      "id": "61",
      "interest": "Engineering management"
    },
    {
      "id": "62",
      "interest": "Engineering psychology"
    },
    {
      "id": "63",
      "interest": "Ergonomics"
    },
    {
      "id": "64",
      "interest": "Facilities Engineering"
    },
    {
      "id": "65",
      "interest": "Logistic engineering"
    },
    {
      "id": "66",
      "interest": "Model-driven engineering"
    },
    {
      "id": "67",
      "interest": "Performance engineering"
    },
    {
      "id": "68",
      "interest": "Process engineering"
    },
    {
      "id": "69",
      "interest": "Product Family Engineering"
    },
    {
      "id": "70",
      "interest": "Quality engineering"
    },
    {
      "id": "71",
      "interest": "Reliability engineering"
    },
    {
      "id": "72",
      "interest": "Safety engineering"
    },
    {
      "id": "73",
      "interest": "Security engineering"
    },
    {
      "id": "74",
      "interest": "Support engineering"
    },
    {
      "id": "75",
      "interest": "Systems engineering"
    },
    {
      "id": "76",
      "interest": "Metallurgical Engineering"
    },
    {
      "id": "77",
      "interest": "Surface Engineering"
    },
    {
      "id": "78",
      "interest": "Biomaterials Engineering"
    },
    {
      "id": "79",
      "interest": "Crystal Engineering"
    },
    {
      "id": "80",
      "interest": "Amorphous Metals"
    },
    {
      "id": "81",
      "interest": "Metal Forming"
    },
    {
      "id": "82",
      "interest": "Ceramic Engineering"
    },
    {
      "id": "83",
      "interest": "Plastics Engineering"
    },
    {
      "id": "84",
      "interest": "Forensic Materials Engineering"
    },
    {
      "id": "85",
      "interest": "Composite Materials"
    },
    {
      "id": "86",
      "interest": "Casting"
    },
    {
      "id": "87",
      "interest": "Electronic Materials"
    },
    {
      "id": "88",
      "interest": "Nano materials"
    },
    {
      "id": "89",
      "interest": "Corrosion Engineering"
    },
    {
      "id": "90",
      "interest": "Vitreous Materials"
    },
    {
      "id": "91",
      "interest": "Welding"
    },
    {
      "id": "92",
      "interest": "Acoustical engineering"
    },
    {
      "id": "93",
      "interest": "Aerospace engineering"
    },
    {
      "id": "94",
      "interest": "Audio engineering"
    },
    {
      "id": "95",
      "interest": "Automotive engineering"
    },
    {
      "id": "96",
      "interest": "Building services engineering"
    },
    {
      "id": "97",
      "interest": "Earthquake engineering"
    },
    {
      "id": "98",
      "interest": "Forensic engineering"
    },
    {
      "id": "99",
      "interest": "Marine engineering"
    },
    {
      "id": "100",
      "interest": "Mechatronics"
    },
    {
      "id": "101",
      "interest": "Nanoengineering"
    },
    {
      "id": "102",
      "interest": "Naval architecture"
    },
    {
      "id": "103",
      "interest": "Sports engineering"
    },
    {
      "id": "104",
      "interest": "Structural engineering"
    },
    {
      "id": "105",
      "interest": "Vacuum engineering"
    },
    {
      "id": "106",
      "interest": "Military engineering"
    },
    {
      "id": "107",
      "interest": "Combat engineering"
    },
    {
      "id": "108",
      "interest": "Offshore engineering"
    },
    {
      "id": "109",
      "interest": "Optical engineering"
    },
    {
      "id": "110",
      "interest": "Geophysical engineering"
    },
    {
      "id": "111",
      "interest": "Mineral engineering"
    },
    {
      "id": "112",
      "interest": "Mining engineering"
    },
    {
      "id": "113",
      "interest": "Reservoir engineering"
    },
    {
      "id": "114",
      "interest": "Climate engineering"
    },
    {
      "id": "115",
      "interest": "Computer-aided engineering"
    },
    {
      "id": "116",
      "interest": "Cryptographic engineering"
    },
    {
      "id": "117",
      "interest": "Information engineering"
    },
    {
      "id": "118",
      "interest": "Knowledge engineering"
    },
    {
      "id": "119",
      "interest": "Language engineering"
    },
    {
      "id": "120",
      "interest": "Release engineering"
    },
    {
      "id": "121",
      "interest": "Teletraffic engineering"
    },
    {
      "id": "122",
      "interest": "Usability engineering"
    },
    {
      "id": "123",
      "interest": "Web engineering"
    },
    {
      "id": "124",
      "interest": "Systems engineering"
    }
]);