import * as React from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Button } from "./components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PenIcon, TrashIcon } from "lucide-react"

export type Record = {
  id: string
  name: string
  email: string
}

export type Records = Record[]

function UpdateRecordDialog({record, onUpdate}: {record: Record, onUpdate: (opts: {name: string, email: string}) => void}) {
  const [newName, setNewName] = React.useState(record.name)
  const [newEmail, setNewEmail] = React.useState(record.email)

  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <PenIcon className="text-blue-500" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update</DialogTitle>
          <DialogDescription>
            Update the record
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="submit" onClick={() => {onUpdate({name: newName, email: newEmail}); setOpen(false)}}>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function App() {
  const [records, setRecords] = React.useState<Records>([])

  const [newRecordName, setNewRecordName] = React.useState("")
  const [newRecordEmail, setNewRecordEmail] = React.useState("")

  const [newId, setNewId] = React.useState(0)

  const [open, setOpen] = React.useState(false)

  return (
    <div className="container mx-auto w-[80ch] flex flex-col items-center gap-4 pt-20">
      <div className="flex w-full justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              Add Record
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add record</DialogTitle>
              <DialogDescription>
                Form to add a new record
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newRecordName}
                  onChange={(e) => setNewRecordName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  value={newRecordEmail}
                  onChange={(e) => setNewRecordEmail(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button type="submit" onClick={() => {
                setRecords([...records, {id: `${newId}`, name: newRecordName, email: newRecordEmail}])
                setNewId(newId + 1)
                setNewRecordName("")
                setNewRecordEmail("")
                setOpen(false)
              }}>Update</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-md border w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.id}</TableCell>
                  <TableCell>{record.name}</TableCell>
                  <TableCell>{record.email}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="icon" variant="outline">
                            <TrashIcon className="text-red-500" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                              This action cannot be undone. This will permanently delete your account
                              and remove your data from our servers.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button type="button" variant="secondary">
                                Close
                              </Button>
                            </DialogClose>
                            <Button type="submit" onClick={() => {setRecords(records.filter((x) => x.id !== record.id))}}>Delete</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <UpdateRecordDialog record={record} onUpdate={(newRecord) => {
                        setRecords(records.map((x) => x.id === record.id ? {...x, ...newRecord} : x))
                      }} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default App
