import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Priority, PRIORITY_LABELS } from '../types/task';
import { Flame, Calendar, Zap } from 'lucide-react';

interface TaskFormProps {
  onAddTask: (decree: string, prophecyDate: string, urgencyLevel: Priority) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [decree, setDecree] = useState('');
  const [prophecyDate, setProphecyDate] = useState('');
  const [urgencyLevel, setUrgencyLevel] = useState<Priority>('first-year');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (decree.trim() && prophecyDate) {
      onAddTask(decree.trim(), prophecyDate, urgencyLevel);
      setDecree('');
      setProphecyDate('');
      setUrgencyLevel('first-year');
    }
  };

  return (
    <Card className="parchment shadow-parchment border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="font-magical text-xl text-center flex items-center justify-center gap-2">
          <Flame className="h-5 w-5 text-primary" />
          Inscribe a New Decree
          <Flame className="h-5 w-5 text-primary" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Decree Input */}
          <div className="space-y-2">
            <Label htmlFor="decree" className="font-parchment text-sm font-semibold flex items-center gap-2">
              <Zap className="h-4 w-4 text-accent" />
              The Decree
            </Label>
            <Input
              id="decree"
              type="text"
              value={decree}
              onChange={(e) => setDecree(e.target.value)}
              placeholder="Scribble your next Decree..."
              className="input-magical font-parchment text-base"
              required
            />
          </div>

          {/* Prophecy Date Input */}
          <div className="space-y-2">
            <Label htmlFor="prophecyDate" className="font-parchment text-sm font-semibold flex items-center gap-2">
              <Calendar className="h-4 w-4 text-accent" />
              Prophecy Date
            </Label>
            <Input
              id="prophecyDate"
              type="date"
              value={prophecyDate}
              onChange={(e) => setProphecyDate(e.target.value)}
              className="input-magical font-parchment"
              required
            />
          </div>

          {/* Urgency Level Select */}
          <div className="space-y-2">
            <Label htmlFor="urgencyLevel" className="font-parchment text-sm font-semibold flex items-center gap-2">
              <Zap className="h-4 w-4 text-accent" />
              Urgency Level
            </Label>
            <Select value={urgencyLevel} onValueChange={(value: Priority) => setUrgencyLevel(value)}>
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
            disabled={!decree.trim() || !prophecyDate}
          >
            <Flame className="h-5 w-5 mr-2" />
            Incendio - Conjure Decree
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};