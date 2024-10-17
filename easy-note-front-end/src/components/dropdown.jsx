const DropdownList = ({categoryList, setCategoryList}) => {
    return (
        <div>
            <select 
                className="border rounded bg-slate-50 hover:bg-blue-500 hover:text-white duration-300" 
                onChange={(e) => setCategoryList(e.target.value)}
                value={categoryList}
            >
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Study">Study</option>
                <option value="Ideas">Ideas</option>
                <option value="Reminders">Reminders</option>
            </select>
        </div>
    )

}

export default DropdownList;