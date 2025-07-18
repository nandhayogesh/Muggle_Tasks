import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Priority, PRIORITY_LABELS } from '../types/task';
import { Flame, Calendar, Zap } from 'lucide-react';

interface TaskFormProps {
  onAddTask: (task: string, dueDate: string, priority: Priority) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [task, setTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<Priority>('first-year');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (task.trim() && dueDate) {
      onAddTask(task.trim(), dueDate, priority);
      setTask('');
      setDueDate('');
      setPriority('first-year');
    }
  };

  return (
    <Card className="parchment shadow-parchment border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="font-magical text-xl text-center flex items-center justify-center gap-2">
          <Flame className="h-5 w-5 text-primary" />
          Add New Task
          <Flame className="h-5 w-5 text-primary" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Decree Input */}
          <div className="space-y-2">
            <Label htmlFor="task" className="font-parchment text-sm font-semibold flex items-center gap-2">
              <Zap className="h-4 w-4 text-accent" />
              Task Description
            </Label>
            <Input
              id="task"
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="What needs to be done?"
              className="input-magical font-parchment text-base"
              required
            />
          </div>

          {/* Prophecy Date Input */}
          <div className="space-y-2">
            <Label htmlFor="dueDate" className="font-parchment text-sm font-semibold flex items-center gap-2">
              <Calendar className="h-4 w-4 text-accent" />
              Due Date
            </Label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="input-magical font-parchment"
              required
            />
          </div>

          {/* Urgency Level Select */}
          <div className="space-y-2">
            <Label htmlFor="priority" className="font-parchment text-sm font-semibold flex items-center gap-2">
              <Zap className="h-4 w-4 text-accent" />
              Priority Level
            </Label>
            <Select value={priority} onValueChange={(value: Priority) => setPriority(value)}>
              <SelectTrigger className="input-magical font-parchment">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="first-year" className="font-parchment">
                  <span className="text-magical-green">⚡ {PRIORITY_LABELS['first-year']}</span>
                </SelectItem>
                <SelectItem value="owl" className="font-parchment">
                  <span className="text-amber-500">🔥 {PRIORITY_LABELS['owl']}</span>
                </SelectItem>
                <SelectItem value="newt" className="font-parchment">
                  <span className="text-magical-red">💀 {PRIORITY_LABELS['newt']}</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full btn-magical font-magical text-lg py-3"
            disabled={!task.trim() || !dueDate}
          >
            <Flame className="h-5 w-5 mr-2" />
            Add Task
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};