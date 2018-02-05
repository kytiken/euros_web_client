import { Record } from 'immutable';

const documentAttr = {
  id: null,
  url: '',
  body: '',
};

export default class DocumentRecord extends Record(documentAttr) {
}
