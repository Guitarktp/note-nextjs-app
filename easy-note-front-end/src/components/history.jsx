

const NoteEditHistory = ({ editHistory}) => {



    return (
    <div className="relative">

      {editHistory.length > 0 ? (
        <ul className="space-y-4">
            {editHistory.map((history,index) => (
                <li key={index} className="p-4 border rounded-md">
                  <p><strong>Edited On</strong>: {new Date(history.editedOn).toLocaleString()}</p>
                  <p><strong>Edited By</strong>: {history.editedBy}</p>
                  <p><strong>Title: </strong>{history.oldTitle}</p>
                  <p><strong>Content: </strong>{history.oldContent}</p>
                  <p><strong>Tags:</strong> {history.oldTags.join(', ')}</p>
                </li>
            ))}
        </ul>
      ):(
        <p>No edit history available.</p>
      )}
    </div>
    )
}

export default NoteEditHistory