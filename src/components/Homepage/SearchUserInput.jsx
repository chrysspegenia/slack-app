import {useState, useRef, useEffect} from 'react';
import './SearchUserInput.css'

const SearchUserInput = (props) => {

    const {directMessageUsers, handleMessageTargetDM} = props
    
    const [displayAccount, setDisplayAccount] = useState("");

    const handleSearchAccount = (event) =>{
        setDisplayAccount(event.target.value);
    }

    const searchDisplay = useRef(null);

    const handleActiveSearch = () =>{
        searchDisplay.current.classList.add("active-search-display");
    }

    const handleOffSearch = () =>{
        searchDisplay.current.classList.remove("active-search-display");
    }

    //function display result of the handleSearchName
    const handleShowExistingAccount = () => {

        const matchAccounts = directMessageUsers.filter((account) => {
            //trims the input value and sets to Uppercase if string
            const trimmedInput = displayAccount.trim().toUpperCase();

            return(
                //if string is inputted, returns the account names that start with the current string input value
                account.uid.toUpperCase().startsWith(trimmedInput)
                    //or if numbers are inputted compares, returns the account numbers that start with the current input value
                || String(account.id).startsWith(trimmedInput)
            )
        })

        //displays the accounts that matches the conditions of matchAccounts
        if(matchAccounts.length > 0){
            //container element for the list of matching accounts
            return <div className='search-account-container'>
                        <div className='found-result-msg'>
                            <i className="fa-regular fa-circle-check" style={{color: '#32ae29'}}></i>
                            {/* displays the total number of accounts that match the current input value */}
                            {matchAccounts.length} Accounts Found
                        </div>
                    {
                        matchAccounts.map((existingAccount) => {

                            return <div className="existing-account" 
                                        key={existingAccount.id}
                                        onMouseDown={() => handleMessageTargetDM(existingAccount)}
                                        >
                                        <i className="user-icon fa-regular fa-user"></i>
                                        <div className="existing-account-number">{existingAccount.id}</div>
                                        <div className="existing-account-name">{existingAccount.uid}</div>
                                    </div>
                            })
                        }
                    </div>
        } else {
            return <div className='no-result-msg'><i className="fa-regular fa-circle-xmark" style={{color: '#f41f1f'}}></i> No Results Found</div>
        }
    }
    
    return (
        <div className='search-user-section'>
            <p>To:</p>
            <input 
                onFocus={handleActiveSearch}
                onBlur={handleOffSearch}
                onChange={handleSearchAccount}
                className='search-user-input' 
                type='text' 
                placeholder='ID ie. 4000 or somebody@example.com'>
            </input>
            <div ref={searchDisplay} className='search-account-display'>
                {handleShowExistingAccount()}
            </div>
        </div>
    );
};

export default SearchUserInput;