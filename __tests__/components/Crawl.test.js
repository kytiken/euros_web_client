import React from 'react';
import renderer from 'react-test-renderer';
import Crawl from '../../components/Crawl';
import CrawlRecord from '../../models/CrawlRecord';

it('renders correctly', () => {
  const crawl = new CrawlRecord({
    id: 1,
    url: 'http://google.com',
    depthLimit: 2,
    timeout: 60000,
    recvTimeout: 70000,
    pattern: '.*',
    cookie: 'hoge',
  });
  const tree = renderer
    .create(<Crawl key={crawl.id} crawl={crawl} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
