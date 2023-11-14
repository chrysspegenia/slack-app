import { act } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import SearchBox from "../components/Homepage/SearchBox";

test ("render SearchBox", () => {
    render(<SearchBox />);
})