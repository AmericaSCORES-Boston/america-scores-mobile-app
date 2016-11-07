export const student1 = {
  'id': 1,
  'name': 'John Doe',
  'dob': '03-29-2002',
  'height': 15,
  'weight': null
};

export const student2 = {
  'id': 2,
  'name': 'Jeremy Parker',
  'dob': '08-12-1996',
  'height': 10,
  'weight': 50
};

export const student3 = {
  'id': 3,
  'name': 'Sally Smith',
  'dob': '02-05-1997',
  'height': null,
  'weight': null
};

export const badStudent = {
  'id': 4,
  'name': 'Grim Reaper',
  'dob': '01-01-1900',
  'height': 'tall',
  'weight': null,
  'living': false
};

export const students = [
  student1,
  student2,
  student3
];

export const studentsWithHeightAndWeight = [
  student2
];

export const studentsWithoutHeightAndWeight = [
  student1,
  student3
];
