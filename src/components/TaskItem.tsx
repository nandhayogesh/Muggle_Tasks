import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Task, Priority, PRIORITY_LABELS } from '../types/task';
import { CheckCircle2, Circle, Edit3, Trash2, Save, X, Calendar, Zap } from 'lucide-react';
import { format } from 'date-fns';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onUpdateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  onDeleteTask: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onUpdateTask,
  onDeleteTask
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editDecree, setEditDecree] = useState(task.decree);
  const [editProphecyDate, setEditProphecyDate] = useState(task.prophecyDate);
  const [editUrgencyLevel, setEditUrgencyLevel] = useState(task.urgencyLevel);

  const handleSave = () => {
    if (editDecree.trim()) {
      onUpdateTask(task.id, {
        decree: editDecree.trim(),
        prophecyDate: editProphecyDate,
        urgencyLevel: editUrgencyLevel
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditDecree(task.decree);
    setEditProphecyDate(task.prophecyDate);
    setEditUrgencyLevel(task.urgencyLevel);
    setIsEditing(false);
  };

  const getPriorityIcon = (priority: Priority) => {
    switch (priority) {
      case 'newt': return '💀';
      case 'owl': return '🔥';
      case 'first-year': return '⚡';
      default: return '⚡';
    }
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'newt': return 'text-magical-red';
      case 'owl': return 'text-amber-500';
      case 'first-year': return 'text-magical-green';
      default: return 'text-magical-green';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return dateString;
    }
  };

  const isOverdue = () => {
    const today = new Date();
    const dueDate = new Date(task.prophecyDate);
    return !task.completed && dueDate < today;
  };

  return (
    <Card className={`parchment shadow-parchment border-border/50 transition-all duration-300 hover:shadow-magical ${
      task.completed ? 'task-completed' : ''
    } ${isOverdue() ? 'border-magical-red/50' : ''}`}>
      <CardContent className="p-4">
        {isEditing ? (
          // Edit Mode
          <div className="space-y-4">
            <Input
              value={editDecree}
              onChange={(e) => setEditDecree(e.target.value)}
              className="input-magical font-parchment"
              placeholder="Edit your decree..."
            />
            
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  type="date"
                  value={editProphecyDate}
                  onChange={(e) => setEditProphecyDate(e.target.value)}
                  className="input-magical font-parchment text-sm"
                />
              </div>
              
              <div className="flex-1">
                <Select value={editUrgencyLevel} onValueChange={(value: Priority) => setEditUrgencyLevel(value)}>
                  <SelectTrigger className="input-magical font-parchment text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="first-year" className="font-parchment text-sm">
                      <span className="text-magical-green">⚡ {PRIORITY_LABELS['first-year']}</span>
                    </SelectItem>
                    <SelectItem value="owl" className="font-parchment text-sm">
                      <span className="text-amber-500">🔥 {PRIORITY_LABELS['owl']}</span>
                    </SelectItem>
                    <SelectItem value="newt" className="font-parchment text-sm">
                      <span className="text-magical-red">💀 {PRIORITY_LABELS['newt']}</span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                size="sm"
                className="bg-magical-green hover:bg-magical-green/90 text-white font-parchment"
              >
                <Save className="h-4 w-4 mr-1" />
                Finite
              </Button>
              <Button
                onClick={handleCancel}
                size="sm"
                variant="outline"
                className="font-parchment"
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          // View Mode
          <div className="space-y-3">
            {/* Main Content */}
            <div className="flex items-start gap-3">
              <Button
                onClick={() => onToggleComplete(task.id)}
                variant="ghost"
                size="sm"
                className="p-1 mt-1 hover:bg-transparent"
              >
                {task.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-magical-green" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                )}
              </Button>
              
              <div className="flex-1 min-w-0">
                <p className={`font-parchment text-base leading-relaxed ${
                  task.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                }`}>
                  {task.decree}
                </p>
                
                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span className={`font-parchment ${isOverdue() ? 'text-magical-red font-semibold' : ''}`}>
                      {formatDate(task.prophecyDate)}
                      {isOverdue() && !task.completed && ' (Overdue)'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    <span className={`font-parchment ${getPriorityColor(task.urgencyLevel)}`}>
                      {getPriorityIcon(task.urgencyLevel)} {PRIORITY_LABELS[task.urgencyLevel]}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/30">
              <Button
                onClick={() => setIsEditing(true)}
                size="sm"
                variant="ghost"
                className="text-accent hover:text-accent/80 font-parchment text-xs"
                disabled={task.completed}
              >
                <Edit3 className="h-3 w-3 mr-1" />
                Reparo
              </Button>
              
              <Button
                onClick={() => onDeleteTask(task.id)}
                size="sm"
                variant="ghost"
                className="text-destructive hover:text-destructive/80 font-parchment text-xs"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Avada Kedavra
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};