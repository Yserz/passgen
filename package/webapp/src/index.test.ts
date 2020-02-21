import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

// traverse all testfiles for webpack dependency resolution
const testsContext = require.context('.', true, /test\.tsx?$/);
testsContext.keys().forEach(testsContext);
